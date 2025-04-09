import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faVoteYea,
  faSpinner,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../App";

const Elections = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showElections, setShowElections] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const { theme } = useContext(ThemeContext);

  const fetchElections = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/allelections", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setElections(data.elections);
    } catch (err) {
      console.error("Error fetching elections:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowElections = () => {
    setShowElections(true);
    fetchElections();
  };

  const handleVote = (electionId, candidateId) => {
    swal({
      title: "Confirm Your Vote",
      text: "Once you vote, it cannot be changed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        fetch("http://localhost:5000/vote", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({ electionId, candidateId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              swal("Error", data.error, "error");
            } else {
              swal({
                title: "Thank You for Voting!",
                text: "Your vote has been counted! 🗳️",
                icon: "success",
                button: "Okay",
              }).then(() => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                navigate("/signin");
              });

              setElections((prevElections) =>
                prevElections.map((election) =>
                  election._id === electionId
                    ? {
                        ...election,
                        votes: Array.isArray(election.votes)
                          ? [...election.votes, userId]
                          : [userId],
                      }
                    : election
                )
              );
            }
          })
          .catch((err) => console.error("Error voting:", err));
      }
    });
  };

  return (
    <div
      className={`container mt-5 p-4 rounded shadow-lg text-center ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <h2 className="fw-bold">Welcome, {user?.name || "Voter"}! 🗳️</h2>
      <blockquote className="blockquote mt-3">
        <p className="mb-0">
          <FontAwesomeIcon icon={faQuoteLeft} className="me-2" />
          The ballot is stronger than the bullet.
        </p>
        <br />
        <footer className="blockquote-footer text-secondary">
          Abraham Lincoln
        </footer>
      </blockquote>

      {!showElections && (
        <button
          className="btn btn-primary mt-3 fw-bold px-4 py-2"
          onClick={handleShowElections}
        >
          <FontAwesomeIcon icon={faVoteYea} className="me-2" />
          Show Elections
        </button>
      )}

      {showElections && (
        <div className="mt-5">
          <h2 className="text-center fw-bold">
            <FontAwesomeIcon icon={faVoteYea} className="me-2" />
            Elections
          </h2>

          {loading ? (
            <p className="text-center text-secondary">
              <FontAwesomeIcon icon={faSpinner} spin /> Loading elections...
            </p>
          ) : elections.length === 0 ? (
            <p className="text-center text-danger">No elections available</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-center">
              {elections.map((election) => (
                <div
                  key={election._id}
                  className="col-lg-6 col-md-8 col-sm-10 mb-4"
                >
                  <div
                    className={`card shadow-sm p-3 mx-auto ${
                      theme === "dark"
                        ? "bg-secondary text-light"
                        : "bg-white text-dark"
                    }`}
                    style={{ maxWidth: "500px" }}
                  >
                    <h5 className="text-center fw-bold">
                      {election.title}{" "}
                      {election.resultsReleased && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="text-success ms-2"
                          title="Results Released"
                        />
                      )}
                    </h5>

                    <ul className="list-group">
                      {election.candidates.map((candidate) => (
                        <li
                          key={candidate._id}
                          className={`list-group-item d-flex justify-content-between align-items-center ${
                            theme === "dark"
                              ? "bg-dark text-light"
                              : "bg-light text-dark"
                          }`}
                        >
                          <div>
                            <strong>{candidate.name}</strong> -{" "}
                            {candidate.party}
                          </div>

                          {!Array.isArray(election.votes) ||
                          !election.votes.includes(userId) ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                handleVote(election._id, candidate._id)
                              }
                            >
                              <FontAwesomeIcon
                                icon={faVoteYea}
                                className="me-1"
                              />
                              Vote
                            </button>
                          ) : (
                            <button className="btn btn-danger btn-sm" disabled>
                              <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="me-1"
                              />
                              Voted
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Elections;
