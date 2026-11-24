import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import logo from "../../assets/logocar.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const isActive = true;

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login details", credentials);

    localStorage.setItem("authToken", "your-authentication-token-here");

    toast.success("Login Successful! Welcome back", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    onClose: () => {
  const redirectPath = location.state?.from || "/";

  navigate(redirectPath, {
    replace: true,
    state: location.state?.car
      ? { car: location.state.car }
      : null,
  });
},
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-page-container">
      {/* ANIMATED DARK BACKGROUND */}
      <div className="animated-background">
        <div className={`orb-1 ${isActive ? "orb-1-active" : ""}`} />

        <div className={`orb-2 ${isActive ? "orb-2-active" : ""}`} />

        <div className={`orb-3 ${isActive ? "orb-3-active" : ""}`} />
      </div>

      {/* BACK BUTTON */}
      <a href="/" className="login-back-button">
        <FaArrowLeft className="back-icon" />
        <span className="back-text">Back to Home</span>
      </a>

      {/* LOGIN CARD */}
      <div
        className={`login-card-container ${
          isActive ? "login-card-visible" : "login-card-hidden"
        }`}
      >
        <div className="login-card">
          <div className="card-decor-1" />
          <div className="card-decor-2" />

          {/* HEADER */}
          <div className="login-header">
            <div className="login-logo-container">
              <div className="login-logo-text">
                <img
                  src={logo}
                  alt="KARZONE logo"
                  className="login-logo-image"
                />

                <span className="login-brand-name">KARZONE</span>
              </div>
            </div>

            <h1 className="login-title">PremiumDrive</h1>

            <p className="login-subtitle">LUXURY MOBILITY EXPERIENCE</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* EMAIL INPUT */}
            <div className="input-container">
              <div className="input-wrapper">
                <div className="input-icon">
                  <FaUser />
                </div>

                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="login-input"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="input-container">
              <div className="input-wrapper">
                <div className="input-icon">
                  <FaLock />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="login-input password-input"
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button type="submit" className="login-submit-button">
              <span className="button-text">ACCESS PREMIUM GARAGE</span>

              <div className="button-hover" />
            </button>
          </form>

          {/* SIGNUP SECTION */}
          <div className="signup-section">
            <p className="signup-text">Don't have an account?</p>

            <a href="/signup" className="signup-button">
              CREATE ACCOUNT
            </a>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
