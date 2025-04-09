import React, { useState, useEffect, useContext } from "react";
import { UserContext, ThemeContext } from "../../App"; // ✅ Import Theme Context
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVoteYea,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Results = () => {
  // eslint-disable-next-line no-unused-vars
  const { state } = useContext(UserContext);
  const { theme } = useContext(ThemeContext); // ✅ Get Theme Mode (light/dark)
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch("http://localhost:5000/allelections", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(
        "Election Results from API:",
        JSON.stringify(data.elections, null, 2)
      );

      setElections(data.elections || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching results:", err);
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        color: theme === "dark" ? "#fff" : "#000",
        backgroundColor: theme === "dark" ? "#222" : "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 className="text-center fw-bold">
        <FontAwesomeIcon icon={faVoteYea} className="me-2 text-primary" />
        Election Results
      </h2>

      {loading ? (
        <p className="text-center text-secondary">Loading results...</p>
      ) : elections.length === 0 ? (
        <p className="text-center text-danger">No election results available</p>
      ) : (
        <div className="row">
          {elections.map((election) => {
            const totalVotes = election.candidates.reduce(
              (acc, candidate) => acc + (candidate.votes || 0),
              0
            );

            const winner = election.candidates.reduce((prev, current) =>
              (prev.votes || 0) > (current.votes || 0) ? prev : current
            );

            return (
              <div key={election._id} className="col-lg-6 col-md-12 mb-4">
                <div
                  className="card shadow-sm p-3"
                  style={{
                    backgroundColor: theme === "dark" ? "#333" : "#fff",
                    color: theme === "dark" ? "#ddd" : "#000",
                    borderRadius: "10px",
                  }}
                >
                  <h5 className="text-center fw-bold">
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    {election.title}
                  </h5>
                  <p className="text-center text-muted">
                    Total Votes: <strong>{totalVotes}</strong>
                  </p>
                  <ul className="list-group">
                    {election.candidates.map((candidate) => (
                      <li
                        key={candidate._id}
                        className={`list-group-item d-flex justify-content-between align-items-center 
                          ${candidate._id === winner._id ? "bg-success text-white" : ""}`}
                        style={{
                          backgroundColor:
                            candidate._id === winner._id
                              ? theme === "dark"
                                ? "#28a745"
                                : "#2ecc71"
                              : theme === "dark"
                                ? "#444"
                                : "#f8f9fa",
                          color:
                            candidate._id === winner._id
                              ? "#fff"
                              : theme === "dark"
                                ? "#ddd"
                                : "#000",
                          fontWeight:
                            candidate._id === winner._id ? "bold" : "normal",
                          borderRadius: "6px",
                          padding: "10px",
                          marginBottom: "5px",
                        }}
                      >
                        <div>
                          <strong>{candidate.name}</strong> - {candidate.party}
                        </div>
                        <div>
                          <span className="badge bg-primary">
                            {candidate.votes || 0} Votes
                          </span>
                          {candidate._id === winner._id && (
                            <FontAwesomeIcon
                              icon={faTrophy}
                              style={{ color: "#FFD700", marginLeft: "8px" }}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Results;
