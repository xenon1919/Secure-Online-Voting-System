import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Profile from "./Profile";

const Home = () => {
  const [elections, setElections] = useState([]);

  // Get user info from localStorage (handling errors)
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user?._id || null;

  // Fetch elections from backend
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch("http://localhost:5000/allelections", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        const result = await response.json();
        if (result?.elections) {
          setElections(result.elections);
        } else {
          console.error("Invalid response format:", result);
        }
      } catch (err) {
        console.error("Error fetching elections:", err);
      }
    };
    fetchElections();
  }, []);

  // Voting Function
  const voteCandidate = async (electionId, candidateId) => {
    const willVote = await swal({
      title: "Confirm Your Vote",
      text: "Once you vote, you cannot change your choice!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willVote) {
      try {
        const response = await fetch("http://localhost:5000/vote", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ electionId, candidateId, userId }),
        });

        const updatedElection = await response.json();
        if (updatedElection) {
          setElections((prevElections) =>
            prevElections.map((elec) =>
              elec._id === updatedElection._id ? updatedElection : elec
            )
          );
          swal("Vote Submitted!", "Your vote has been recorded.", "success");
        }
      } catch (err) {
        console.error("Error submitting vote:", err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Sidebar - Profile */}
        <div className="col-md-3">
          <Profile />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <div className="card shadow-lg p-3">
            <h3
              className="text-center text-primary fw-bold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              🗳 Elections
            </h3>

            {elections.length === 0 ? (
              <p className="text-center text-muted">No elections available.</p>
            ) : (
              elections.map((election) => (
                <div
                  key={election._id}
                  className="card my-3 border-0 shadow-sm p-3"
                >
                  <h5 className="text-center">{election.title}</h5>

                  {election.candidates.map((candidate) => {
                    const hasVoted =
                      Array.isArray(election.votes) &&
                      election.votes.includes(userId);

                    return (
                      <div
                        key={candidate._id}
                        className="d-flex align-items-center justify-content-between border-bottom py-2"
                      >
                        <h6 className="mb-0">
                          {candidate.name} ({candidate.party})
                        </h6>
                        <img
                          src={candidate.symbol || "default-symbol.png"}
                          alt="Party Symbol"
                          className="rounded-circle"
                          style={{ width: "50px", height: "50px" }}
                        />
                        <button
                          className={`btn ${hasVoted ? "btn-danger" : "btn-success"}`}
                          onClick={() =>
                            !hasVoted &&
                            voteCandidate(election._id, candidate._id)
                          }
                          disabled={hasVoted}
                        >
                          {hasVoted ? "Voted" : "Vote"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
