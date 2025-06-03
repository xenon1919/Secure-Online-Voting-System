/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import ReCAPTCHA from "react-google-recaptcha"; // ✅ Import reCAPTCHA
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
  faSpinner,
  faKey,
  faEye,
  faEyeSlash,
  faClock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [userId, setUserId] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [success, setSuccess] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null); // ✅ reCAPTCHA value
  const [captchaError, setCaptchaError] = useState(""); // ✅ Error message if user skips captcha

  const otpRefs = useRef([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && window.location.pathname === "/signin") {
      dispatch({ type: "USER", payload: user });
      navigate(user.isAdmin ? "/admin" : "/elections");
    }
  }, [dispatch, navigate]);

  const startTimer = () => {
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setOtpSent(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError(""); // ✅ Clear error when user completes the captcha
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const sendOtp = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        html: "⚠️ Email and Password are required!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }

    if (!captchaValue) {
      setCaptchaError(
        <span>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="me-1 text-warning"
          />
          <strong>Please verify you are not a robot!</strong>
        </span>
      );
      return;
    }

    console.log("➡️ Sending OTP request with reCAPTCHA token:", captchaValue);

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, recaptchaToken: captchaValue }),
      });

      const data = await response.json();
      setLoading(false);

      console.log("✅ Response received:", data);

      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          html: `❌ ${data.error}`,
          confirmButtonColor: "#d33",
          confirmButtonText: "Try Again",
        });
      } else {
        setUserId(data.userId);
        setOtpSent(true);
        startTimer();
        otpRefs.current[0].focus();
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          html: "📩 OTP sent to your email",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      setLoading(false);
      console.error("❌ Error:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        html: "❌ Network error!",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  const verifyOtp = () => {
    setLoading(true);
    const finalOtp = otp.join("");

    fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, otp: finalOtp }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "OTP Verification Failed",
            html: `❌ ${data.error}`,
            confirmButtonColor: "#d33",
            confirmButtonText: "Try Again",
          });
        } else {
          setSuccess(true);
          setTimeout(() => {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            navigate(data.user.isAdmin ? "/admin" : "/elections");
          }, 2000);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Network Error",
          html: "❌ Network error!",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow-lg text-center"
        style={{
          width: "40rem",
          borderRadius: "15px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 className="mb-4 text-primary fw-bold">
          <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> Sign In
        </h2>

        <img
          src="/user.png"
          alt="profile"
          className="mx-auto d-block rounded-circle border"
          style={{ width: "90px", marginBottom: "15px" }}
        />

        {success ? (
          <div className="text-center mt-3">
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="4x"
              className="text-success mb-3 animate__animated animate__zoomIn"
            />
            <h4 className="text-success fw-bold animate__animated animate__fadeInUp">
              Login Successful!
            </h4>
          </div>
        ) : !otpSent ? (
          <>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-primary text-white">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text bg-primary text-white">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="input-group-text bg-secondary text-white"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            {/* ✅ reCAPTCHA with Improved UX */}
            <div className="text-center mt-3" style={{ marginBottom: "15px" }}>
              <ReCAPTCHA
                sitekey="6Lccvv8qAAAAABJIOoWrWU5P-gNfSWhH6UJKTjMN"
                onChange={onCaptchaChange}
                className="d-inline-block g-recaptcha"
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px", // ✅ Rounded edges
                }}
              />
              {captchaError && (
                <div className="d-flex justify-content-center mt-2">
                  <p
                    className="text-danger fw-bold d-flex align-items-center animate__animated animate__shakeX"
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="me-2 text-warning"
                    />
                    {captchaError}
                  </p>
                </div>
              )}
            </div>

            <button
              className="btn btn-primary w-100 fw-bold"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              ) : (
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
              )}
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            {/* ✅ Register Button */}
            <p className="text-center mt-3">
              New User?{" "}
              <Link
                to="/signup"
                className="text-decoration-none fw-bold text-primary"
              >
                Register Here
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center gap-2 mb-3">
              {otp.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control text-center"
                  style={{
                    width: "50px",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (otpRefs.current[index] = el)}
                />
              ))}
            </div>

            <div className="mb-3 text-danger">
              {timer > 0 ? (
                <>
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  OTP expires in {timer}s
                </>
              ) : (
                <span className="text-danger fw-bold">
                  OTP expired! Request a new one.
                </span>
              )}
            </div>

            <button
              className="btn btn-success w-100 fw-bold"
              onClick={verifyOtp}
              disabled={loading}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
              ) : (
                <FontAwesomeIcon icon={faKey} className="me-2" />
              )}
              {loading ? "Verifying OTP..." : "Verify & Login"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
