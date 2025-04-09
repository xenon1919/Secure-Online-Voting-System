import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../App"; // ✅ Import Theme Context

const Profile = () => {
  const { theme } = useContext(ThemeContext); // ✅ Get current theme
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      } else {
        console.warn("No user data found in localStorage.");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "80px" }}
    >
      {userInfo ? (
        <div
          className={`card shadow-lg p-4 text-center ${
            theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
          }`}
          style={{
            width: "22rem",
            borderRadius: "10px",
            fontFamily: "'Poppins', sans-serif",
            transition: "0.3s ease-in-out",
          }}
        >
          <h3 className={theme === "dark" ? "text-warning" : "text-primary"}>
            {userInfo.fullName || userInfo.name || "Unknown"}
          </h3>

          <img
            src={userInfo.pic || "/default-profile.png"}
            alt={`${userInfo.fullName || userInfo.name || "User"}'s Profile`}
            className={`rounded-circle border border-3 ${
              theme === "dark" ? "border-warning" : "border-primary"
            }`}
            style={{
              height: "140px",
              width: "140px",
              objectFit: "cover",
              margin: "15px auto",
            }}
          />

          <div className="text-start">
            <p className="mb-1">
              <b>Aadhaar:</b>{" "}
              <span className={theme === "dark" ? "text-light" : "text-muted"}>
                {userInfo.aadhaar || "N/A"}
              </span>
            </p>
            <p className="mb-1">
              <b>State:</b>{" "}
              <span className={theme === "dark" ? "text-light" : "text-muted"}>
                {userInfo.state || "N/A"}
              </span>
            </p>
            <p className="mb-1">
              <b>City:</b>{" "}
              <span className={theme === "dark" ? "text-light" : "text-muted"}>
                {userInfo.city || "N/A"}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p
          className={`text-center fw-semibold ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          User data not available.
        </p>
      )}
    </div>
  );
};

export default Profile;
