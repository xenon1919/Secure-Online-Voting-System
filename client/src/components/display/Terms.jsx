import React, { useContext } from "react";
import { FaGavel, FaCheckCircle } from "react-icons/fa";
import { ThemeContext } from "../../App"; // Import ThemeContext

const Terms = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context

  return (
    <div style={theme === "dark" ? styles.wrapperDark : styles.wrapperLight}>
      <div
        style={theme === "dark" ? styles.containerDark : styles.containerLight}
      >
        <h2 style={styles.heading}>
          <FaGavel style={styles.icon} /> Terms of Service
        </h2>
        <p style={styles.description}>
          By using our <b>Secure Online Voting System</b>, you agree to the
          following terms:
        </p>

        <ul style={styles.list}>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Only registered voters can
            participate.
          </li>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Keep your login
            credentials confidential.
          </li>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Fraudulent activity has
            legal consequences.
          </li>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Election results are final
            and non-disputable.
          </li>
        </ul>

        <p style={styles.footerText}>
          If you <b>disagree</b> with these terms, please do not proceed.
        </p>
      </div>
    </div>
  );
};

// ✅ Styling for Light & Dark Mode
const styles = {
  wrapperLight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f4f4f4",
    fontFamily: "Poppins, sans-serif",
    transition: "background 0.3s ease-in-out",
  },
  wrapperDark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#121212",
    fontFamily: "Poppins, sans-serif",
    transition: "background 0.3s ease-in-out",
  },
  containerLight: {
    maxWidth: "600px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    color: "#333",
  },
  containerDark: {
    maxWidth: "600px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(255, 255, 255, 0.1)",
    backgroundColor: "#1e1e1e",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    color: "#e0e0e0",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#007bff",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "10px",
  },
  description: {
    fontSize: "17px",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  list: {
    textAlign: "left",
    fontSize: "16px",
    listStyle: "none",
    paddingLeft: "0",
    lineHeight: "1.8",
  },
  listIcon: {
    color: "#28a745",
    marginRight: "8px",
  },
  footerText: {
    fontSize: "15px",
    color: "#888",
    marginTop: "20px",
    fontStyle: "italic",
  },
};

export default Terms;
