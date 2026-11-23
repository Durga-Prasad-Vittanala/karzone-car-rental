import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import logo from "../../assets/logocar.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const isActive = true;


  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.error("Please accept terms & conditions", {
        theme: "dark",
      });
      return;
    }

    toast.success("Account created successfully! Welcome to PremiumDrive", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      onClose: () => navigate("/login"),
    });
  };

  // TOGGLE PASSWORD VISIBILITY
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="signup-page-container">
      {/* ANIMATED BACKGROUND */}
      <div className="signup-animated-background">
        <div
          className={`signup-orb-1 ${isActive ? "signup-orb-1-active" : ""}`}
        />

        <div
          className={`signup-orb-2 ${isActive ? "signup-orb-2-active" : ""}`}
        />

        <div
          className={`signup-orb-3 ${isActive ? "signup-orb-3-active" : ""}`}
        />
      </div>

      {/* BACK BUTTON */}
      <a href="/" className="signup-back-button">
        <FaArrowLeft className="signup-back-icon" />

        <span className="signup-back-text">Back to Home</span>
      </a>

      {/* SIGNUP CARD */}
      <div
        className={`signup-card-container ${
          isActive ? "signup-card-visible" : "signup-card-hidden"
        }`}
      >
        <div className="signup-card">
          {/* CARD DECORATIONS */}
          <div className="signup-decor-1" />
          <div className="signup-decor-2" />

          {/* HEADER */}
          <div className="signup-header">
            <div className="signup-logo-container">
              <div className="signup-logo-text">
                <img
                  src={logo}
                  alt="KARZONE logo"
                  className="signup-logo-image"
                />

                <span className="signup-brand-name">KARZONE</span>
              </div>
            </div>

            <h1 className="signup-title">Join PremiumDrive</h1>

            <p className="signup-subtitle">Create your exclusive account</p>
          </div>

          {/* SIGNUP FORM */}
          <form onSubmit={handleSubmit} className="signup-form">
            {/* FULL NAME */}
            <div className="signup-input-container">
              <div className="signup-input-wrapper">
                <div className="signup-input-icon">
                  <FaUser />
                </div>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="signup-input"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="signup-input-container">
              <div className="signup-input-wrapper">
                <div className="signup-input-icon">
                  <FaEnvelope />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="signup-input"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="signup-input-container">
              <div className="signup-input-wrapper">
                <div className="signup-input-icon">
                  <FaLock />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="signup-input signup-password-input"
                  placeholder="Create Password"
                  required
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="signup-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* TERMS AND CONDITIONS */}
            <div className="signup-terms-container">
              <div className="signup-checkbox-wrapper">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms((prev) => !prev)}
                  className="signup-checkbox"
                />
              </div>

              <div className="signup-terms-text">
                <label htmlFor="terms" className="signup-checkbox-label">
                  I agree to the{" "}
                  <span className="signup-checkbox-link">
                    Terms & Conditions
                  </span>
                </label>
              </div>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button type="submit" className="signup-submit-button">
              <span className="signup-button-text">
                <FaCheck className="signup-check-icon" />
                CREATE ACCOUNT
              </span>

              <div className="signup-button-hover" />
            </button>
          </form>

          {/* SIGN IN SECTION */}
          <div className="signin-section">
            <p className="signin-text">Already have an account?</p>

            <a href="/login" className="signin-button">
              LOGIN TO YOUR ACCOUNT
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
        theme="dark"
      />
    </div>
  );
};

export default SignUp;
