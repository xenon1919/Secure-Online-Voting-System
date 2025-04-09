import React, { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import { ThemeContext } from "../../App";
import {
  FaPlusCircle,
  FaTrash,
  FaUsers,
  FaEdit,
  FaLandmark,
  FaUserTie,
  FaFlag,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [elections, setElections] = useState([]);
  const [title, setTitle] = useState("");
  const [candidates, setCandidates] = useState([
    { name: "", party: "", symbol: "" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const res = await fetch("http://localhost:5000/allelections", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      const data = await res.json();
      setElections(data.elections || []);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteElection = async (id) => {
    swal({
      title: "Are you sure?",
      text: "This election will be permanently deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        try {
          const res = await fetch(
            `http://localhost:5000/deleteelection/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          const data = await res.json();
          data.error
            ? swal("Error", data.error, "error")
            : swal("Deleted", "Election has been removed!", "success");
          fetchElections();
        } catch (error) {
          console.error("Error deleting election:", error);
          swal("Error", "Failed to delete election!", "error");
        }
      }
    });
  };

  const addCandidate = () =>
    setCandidates([...candidates, { name: "", party: "", symbol: "" }]);

  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index][field] = value;
    setCandidates(updatedCandidates);
  };

  const createElection = async () => {
    if (!title || candidates.some((c) => !c.name || !c.party || !c.symbol)) {
      swal("Error", "Please fill in all fields!", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/createelection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ title, candidates }),
      });

      const data = await res.json();
      if (data.error) {
        swal("Error", data.error, "error");
      } else {
        swal("Success", "Election created successfully!", "success");
        setTitle("");
        setCandidates([{ name: "", party: "", symbol: "" }]);
        fetchElections();
      }
    } catch (error) {
      console.error("Error creating election:", error);
      swal("Error", "Failed to create election!", "error");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h2
        className="text-center fw-bold"
        style={{
          color: theme === "dark" ? "#fff" : "#007bff",
          fontSize: "28px",
        }}
      >
        <FaUsers className="me-2" /> Admin Dashboard
      </h2>

      <h4 className="text-center mt-4">All Elections</h4>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : elections.length === 0 ? (
        <p className="text-center">No elections available</p>
      ) : (
        <div className="row">
          {elections.map((election) => (
            <div key={election._id} className="col-md-6 mb-3">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h5 className="card-title">
                    <FaEdit className="me-2 text-primary" />
                    {election.title}
                  </h5>
                  <div className="mt-3">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteElection(election._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h4 className="text-center mt-5">
        <FaLandmark className="me-2" /> Create New Election
      </h4>

      <div className="mb-3 input-group">
        <span className="input-group-text">
          <FaLandmark className="text-primary" />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Election Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {candidates.map((candidate, index) => (
        <div key={index} className="mb-2">
          <div className="input-group mb-1">
            <span className="input-group-text">
              <FaUserTie className="text-success" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Candidate Name"
              value={candidate.name}
              onChange={(e) =>
                handleCandidateChange(index, "name", e.target.value)
              }
            />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <FaFlag className="text-danger" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Party Name"
              value={candidate.party}
              onChange={(e) =>
                handleCandidateChange(index, "party", e.target.value)
              }
            />
          </div>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <FaLandmark className="text-warning" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Symbol"
              value={candidate.symbol}
              onChange={(e) =>
                handleCandidateChange(index, "symbol", e.target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className="text-center mt-3">
        <button className="btn btn-outline-primary me-2" onClick={addCandidate}>
          <FaPlusCircle /> Add Candidate
        </button>

        <button className="btn btn-success" onClick={createElection}>
          <FaLandmark /> Create Election
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
