import React, { useContext } from "react";
import { FaUniversalAccess, FaCheckCircle, FaPhoneAlt } from "react-icons/fa";
import { ThemeContext } from "../../App"; // Import ThemeContext

const Accessibility = () => {
  const { theme } = useContext(ThemeContext); // Get theme from context

  return (
    <div style={theme === "dark" ? styles.wrapperDark : styles.wrapperLight}>
      <div
        style={theme === "dark" ? styles.containerDark : styles.containerLight}
      >
        <h2 style={styles.heading}>
          <FaUniversalAccess style={styles.icon} /> Accessibility
        </h2>
        <p style={styles.description}>
          Our system ensures a seamless experience for all users:
        </p>

        <ul style={styles.list}>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Secure & Anonymous Voting.
          </li>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Simple & User-Friendly
            Interface.
          </li>
          <li>
            <FaCheckCircle style={styles.listIcon} /> High Contrast Mode.
          </li>
          <li>
            <FaCheckCircle style={styles.listIcon} /> Responsive Design.
          </li>
        </ul>

        <p style={styles.footerText}>
          <FaPhoneAlt style={styles.contactIcon} /> Need help? Contact our
          accessibility team.
        </p>
      </div>
    </div>
  );
};

//Styles
const styles = {
  wrapperLight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#f4f4f4",
    fontFamily: "'Poppins', sans-serif",
    transition: "background 0.3s ease-in-out",
  },
  wrapperDark: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#121212",
    fontFamily: "'Poppins', sans-serif",
    transition: "background 0.3s ease-in-out",
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
    marginRight: "10px",
  },
  footerText: {
    fontSize: "15px",
    color: "#888",
    marginTop: "20px",
    fontStyle: "italic",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIcon: {
    marginRight: "8px",
    color: "#007bff",
  },
};

export default Accessibility;
