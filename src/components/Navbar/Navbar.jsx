import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logocar.png";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const [, setAuthVersion] = useState(0);

const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  const location = useLocation();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/cars", label: "Cars" },
    { to: "/contact", label: "Contact" },
  ];

  // Update navbar appearance when scrolling.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep login state synchronized with navigation and other tabs.
useEffect(() => {
  const handleStorage = () => {
    setAuthVersion((version) => version + 1);
  };

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}, []);

  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("authToken")));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Close the mobile menu when clicking outside or pressing Escape.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close the mobile menu when switching to desktop.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("authToken");
  setIsOpen(false);
  navigate("/", { replace: true });
};

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const renderAuthButton = (mobile = false) => {
    const className = mobile
      ? "navbar-mobile-auth-button"
      : "navbar-auth-button";

    return isLoggedIn ? (
      <button type="button" onClick={handleLogout} className={className}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    ) : (
      <Link to="/login" onClick={() => setIsOpen(false)} className={className}>
        <FaUser />
        <span>Login</span>
      </Link>
    );
  };

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      aria-label="Main navigation"
    >
      {/* Main horizontal navbar */}
      <div className="floating-nav">
        {/* Logo on the left */}
        <Link to="/" className="navbar-logo" aria-label="KARZONE home">
          <img src={logo} alt="" />
          <span>KARZONE</span>
        </Link>

        {/* Navigation links in the center */}
        <div className="navbar-links">
          {navLinks.map((link, index) => (
            <React.Fragment key={link.to}>
              <Link
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? "active" : ""}`}
                aria-current={isActive(link.to) ? "page" : undefined}
              >
                {link.label}
              </Link>

              {index < navLinks.length - 1 && (
                <span className="navbar-separator" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Login or Logout on the right */}
        <div className="navbar-actions">{renderAuthButton()}</div>

        {/* Mobile menu toggle */}
        <button
          ref={buttonRef}
          type="button"
          className="navbar-mobile-button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`navbar-mobile-menu ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="navbar-mobile-inner">
          <div className="navbar-mobile-grid">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`navbar-mobile-link ${
                  isActive(link.to) ? "active" : ""
                }`}
                aria-current={isActive(link.to) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-mobile-divider" />

          <div className="navbar-mobile-auth">{renderAuthButton(true)}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
