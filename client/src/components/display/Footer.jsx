import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaGavel,
  FaPhone,
  FaEnvelope,
  FaBalanceScale,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#002147",
        color: "#fff",
        textAlign: "center",
        padding: "25px 20px",
        marginTop: "30px",
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
        lineHeight: "1.6",
      }}
    >
      {/* ✅ Government & Security Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
          fontSize: "15px",
          fontWeight: "500",
        }}
      >
        <p>
          <FaShieldAlt style={{ color: "#FFD700" }} /> Secure Online Voting
          System
        </p>
        <p>
          <FaBalanceScale style={{ color: "#FFD700" }} /> Government of India
        </p>
        <p>
          <FaGavel style={{ color: "#FFD700" }} /> Fair & Secure Elections
        </p>
      </div>

      <hr
        style={{
          border: "0.5px solid rgba(255,255,255,0.3)",
          margin: "12px 0",
        }}
      />

      {/* ✅ Navigation Links (Terms, Privacy, Accessibility) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          flexWrap: "wrap",
          fontSize: "14px",
        }}
      >
        <Link
          to="/terms"
          style={{
            color: "#FFD700",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Terms of Service
        </Link>{" "}
        |
        <Link
          to="/privacy"
          style={{
            color: "#FFD700",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Privacy Policy
        </Link>{" "}
        |
        <Link
          to="/accessibility"
          style={{
            color: "#FFD700",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Accessibility
        </Link>
      </div>

      <hr
        style={{
          border: "0.5px solid rgba(255,255,255,0.3)",
          margin: "12px 0",
        }}
      />

      {/* ✅ Contact Info */}
      <div style={{ fontSize: "14px" }}>
        <p>
          <FaPhone style={{ color: "#FFD700" }} /> Helpline: +91-123-456-7890 |
          <FaEnvelope style={{ color: "#FFD700", marginLeft: "8px" }} /> Email:
          support@securevote.in
        </p>
        <p style={{ fontWeight: "500" }}>
          © {new Date().getFullYear()} Government of India. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
