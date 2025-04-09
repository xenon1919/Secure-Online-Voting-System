import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext, ThemeContext } from "../App";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route
  const { state, dispatch } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.clear(); // ✅ Clear session only when clicking Logout
    dispatch({ type: "CLEAR" });
    navigate("/signin");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-primary"} shadow-sm`}
    >
      <div className="container">
        {/* Brand Title */}
        <Link
          to={state ? "/" : "/signin"}
          className="navbar-brand fw-bold fs-4 text-white"
          style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "1px" }}
        >
          <span className="text-light">E-Voting </span>{" "}
          <span className="text-warning">Made Easy</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center fs-5">
            {state?.isAdmin && (
              <li className="nav-item">
                <Link to="/results" className="nav-link text-white fw-semibold">
                  Results
                </Link>
              </li>
            )}

            {/* ✅ Stylish Profile Button for Voter */}
            {/* ✅ Profile Button (Styled Like Login, No Hover Disturbance) */}
            {state && !state.isAdmin && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="btn btn-outline-light ms-3 fw-semibold px-4"
                  style={{
                    fontSize: "16px",
                    letterSpacing: "0.5px",
                  }}
                >
                  👤 Profile
                </Link>
              </li>
            )}

            {/* ✅ Hide Login button on Welcome Page */}
            {!state && location.pathname !== "/" && (
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="btn btn-outline-light ms-3 fw-semibold px-4"
                >
                  Login
                </Link>
              </li>
            )}

            {/* ✅ Show Logout button if user is logged in */}
            {state && (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light ms-3 fw-semibold px-4"
                >
                  Logout
                </button>
              </li>
            )}

            {/* ✅ Dark Mode Toggle */}
            <li className="nav-item">
              <button
                onClick={toggleTheme}
                className={`btn ${theme === "dark" ? "btn-light text-dark" : "btn-dark text-white"} ms-3 fw-semibold px-4`}
              >
                {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
