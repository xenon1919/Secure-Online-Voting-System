import React, { useContext } from "react";
import { FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import { ThemeContext } from "../../App"; // Import ThemeContext

const Privacy = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context

  return (
    <div style={theme === "dark" ? styles.wrapperDark : styles.wrapperLight}>
      <div
        style={theme === "dark" ? styles.containerDark : styles.containerLight}
      >
        <h2 style={styles.heading}>
          <FaShieldAlt style={styles.icon} /> Privacy Policy
        </h2>
        <p style={styles.description}>
          Your privacy is important to us. By using our{" "}
          <b>Secure Online Voting System</b>, you agree to the following privacy
          policies:
        </p>

        <ul style={styles.list}>
          <li>
            <FaCheckCircle style={styles.bulletIcon} /> Your personal
            information will be kept confidential.
          </li>
          <li>
            <FaCheckCircle style={styles.bulletIcon} /> We do not share voter
            data with third parties.
          </li>
          <li>
            <FaCheckCircle style={styles.bulletIcon} /> Your vote remains
            anonymous and secure.
          </li>
          <li>
            <FaCheckCircle style={styles.bulletIcon} /> Unauthorized access or
            misuse of data is strictly prohibited.
          </li>
        </ul>

        <p style={styles.footerText}>
          If you <b>disagree</b> with these policies, please do not proceed.
        </p>
      </div>
    </div>
  );
};

// Styles
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
    padding: "20px",
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
    padding: "20px",
  },
  containerLight: {
    maxWidth: "600px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    color: "#333",
  },
  containerDark: {
    maxWidth: "600px",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(255, 255, 255, 0.1)",
    backgroundColor: "#1e1e1e",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
    color: "#e0e0e0",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#007bff",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "10px",
  },
  description: {
    fontSize: "18px",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  list: {
    textAlign: "left",
    fontSize: "17px",
    listStyle: "none",
    paddingLeft: "0",
    lineHeight: "1.6", // Compact spacing
  },
  bulletIcon: {
    color: "#28a745",
    marginRight: "10px",
  },
  footerText: {
    fontSize: "16px",
    color: "#888",
    marginTop: "25px",
    fontStyle: "italic",
  },
};

export default Privacy;
