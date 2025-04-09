/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faIdCard,
  faEnvelope,
  faLock,
  faCity,
  faFlag,
  faImage,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(""); // Image URL
  const [errors, setErrors] = useState({});

  // ⏳ If Image is uploaded, trigger form submission
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  // 🛑 Validate Form Inputs
  const validateForm = () => {
    let errors = {};

    if (!name.trim()) errors.name = "Full Name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
      errors.email = "Valid email is required";
    if (!password.trim() || password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!state.trim()) errors.state = "State is required";
    if (!city.trim()) errors.city = "City is required";
    if (!aadhaar.trim() || !/^\d{12}$/.test(aadhaar))
      errors.aadhaar = "Valid 12-digit Aadhaar number required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 📸 Upload Image to Cloudinary
  const uploadPic = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "voting");
    data.append("cloud_name", "dvfpkko1z");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvfpkko1z/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const imgData = await res.json();
      setUrl(imgData.url); // ✅ Set Image URL after upload
    } catch (err) {
      console.error("Error uploading image:", err);
      M.toast({ html: "❌ Image upload failed", classes: "text-danger" });
    }
  };

  // 🚀 Upload Data to Backend
  const uploadFields = () => {
    if (!validateForm()) return;

    const userData = {
      name,
      aadhaar,
      password,
      email,
      state,
      city,
      pic: url || "client/public/user.png", // ✅ Default profile if no image uploaded
    };

    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: `❌ ${data.error}`, classes: "text-danger" });
        } else {
          M.toast({ html: "✅ Signup successful!", classes: "text-success" });
          navigate("/signin");
        }
      })
      .catch((err) => console.error("Error during signup:", err));
  };

  // 🔘 Submit Form
  const PostData = () => {
    if (!validateForm()) return;
    if (image) {
      uploadPic(); // ✅ Upload Image First
    } else {
      uploadFields(); // ✅ If No Image, Proceed Directly
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "40rem", borderRadius: "10px" }}
      >
        <h2
          className="text-center mb-4 text-primary"
          style={{ fontWeight: "600" }}
        >
          <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Sign Up
        </h2>
        <form>
          {/* FULL NAME */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* AADHAAR */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FontAwesomeIcon icon={faIdCard} />
            </span>
            <input
              type="text"
              className={`form-control ${errors.aadhaar ? "is-invalid" : ""}`}
              placeholder="Aadhaar Number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* STATE */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FontAwesomeIcon icon={faFlag} />
            </span>
            <input
              type="text"
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          {/* CITY */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white">
              <FontAwesomeIcon icon={faCity} />
            </span>
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faImage} className="me-2" />
              Upload Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={PostData}
          >
            <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/signin" className="text-decoration-none fw-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
