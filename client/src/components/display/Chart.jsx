import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register required chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Chart = () => {
  const [labels, setLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.posts && result.posts.length > 0) {
          setLabels(result.posts.map((item) => item.title));
          setDataValues(result.posts.map((item) => item.votes.length));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching voting data:", err);
        setLoading(false);
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Voting Results",
        backgroundColor: [
          "#007bff", // Blue
          "#dc3545", // Red
          "#ffc107", // Yellow
          "#28a745", // Green
          "#6f42c1", // Purple
          "#17a2b8", // Cyan
        ],
        borderColor: "#fff",
        borderWidth: 2,
        data: dataValues,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Election Voting Results",
        font: { size: 20 },
      },
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  return (
    <div
      className="container text-center mt-5"
      style={{ maxWidth: "600px", fontFamily: "'Poppins', sans-serif" }}
    >
      <h2 className="text-primary fw-bold mb-4">Election Results</h2>
      {loading ? (
        <p className="text-muted">Loading chart...</p>
      ) : labels.length === 0 ? (
        <p className="text-muted">No voting data available</p>
      ) : (
        <Pie data={data} options={options} />
      )}
    </div>
  );
};

export default Chart;
