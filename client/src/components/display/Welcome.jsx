import React, { useContext, useState } from "react";
import { ThemeContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNavigation = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/signin");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-20
      ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}
      transition-all duration-500 ease-in-out`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <br />
      <br />
      <h1 className="mb-3 text-primary fw-bold">
        Welcome to{" "}
        <span
          className="bg-gradient-to-r from-blue-600 to-blue-400 
          text-transparent bg-clip-text 
          hover:from-blue-700 hover:to-blue-500 
          transition-all duration-300 ease-in-out"
        >
          SecureVote
        </span>
      </h1>

      {/* Quote with Enhanced Styling */}
      <p className="text-lg italic text-gray-600 dark:text-gray-300 max-w-xl mb-10 px-4 relative">
        <span className="absolute -left-4 top-0 text-4xl text-blue-500 opacity-50">
          "
        </span>
        The strength of democracy lies in the votes of the people.
        <span className="absolute -right-4 bottom-0 text-4xl text-blue-500 opacity-50">
          "
        </span>
        <br />
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
          — Dr. B.R. Ambedkar
        </span>
      </p>

      <div className="flex justify-center w-full px-4">
        <button
          className="btn btn-primary fw-bold px-8 py-3 rounded-xl shadow-lg flex items-center justify-center 
          bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 
          transform hover:-translate-y-1 hover:scale-105 active:scale-95"
          onClick={handleNavigation}
          disabled={loading}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Redirecting...
            </>
          ) : (
            "Start Voting"
          )}
        </button>
      </div>
      <br />

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8 tracking-wide opacity-80 hover:opacity-100 transition-all">
        Secure & Transparent Digital Elections
      </p>
    </div>
  );
};

export default Welcome;
