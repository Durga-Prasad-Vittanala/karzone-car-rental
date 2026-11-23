import React from "react";
import logo from "../../assets/logocar.png";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkedAlt,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const socialLinks = [
    { Icon: FaFacebookF, url: "#" },
    { Icon: FaTwitter, url: "#" },
    { Icon: FaInstagram, url: "#" },
    { Icon: FaLinkedinIn, url: "#" },
    { Icon: FaYoutube, url: "#" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="footer-container">

      {/* TOP DECORATIVE ELEMENTS */}
      <div className="footer-top-elements">
        <div className="footer-circle-1"></div>
        <div className="footer-circle-2"></div>
        <div className="footer-road-line"></div>
      </div>

      <div className="footer-inner">
        <div className="footer-grid">

          {/* BRAND SECTION */}
          <div className="footer-brand-section">
            <Link to="/" className="footer-logo-container">
              <img
                src={logo}
                alt="KARZONE Logo"
                className="footer-logo-image"
              />
              <span className="footer-logo-text">KARZONE</span>
            </Link>
            <p className="footer-description">
              Premium car rental service with the latest models and exceptional
              customer services. Drive your dream car today!
            </p>

            {/* SOCIAL ICONS */}
            <div className="footer-social-icons">
              {socialLinks.map(({ Icon, url }, index) => (
                <a
                  href={url}
                  key={index}
                  className="footer-social-icon"
                  aria-label={`Social media ${index + 1}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="footer-section-title">
              Quick Links
              <span className="footer-underline"></span>
            </h3>

            <ul className="footer-link-list">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link-item">
                    <span className="footer-bullet"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT SECTION */}
          <div>
            <h3 className="footer-section-title">
              Contact Us
              <span className="footer-underline"></span>
            </h3>

            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <FaMapMarkedAlt className="footer-contact-icon" />
                <span>123 Drive Avenue, Auto City, CA 90201</span>
              </li>

              <li className="footer-contact-item">
                <FaPhone className="footer-contact-icon" />
                <span>+91 8299431275</span>
              </li>

              <li className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" />
                <span>karzoneservices@gmail.com</span>
              </li>
            </ul>

            {/* BUSINESS HOURS */}
            <div className="footer-hours-container">
              <h4 className="footer-hours-title">Business Hours</h4>

              <div className="footer-hours-text">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="footer-section-title">
              Newsletter
              <span className="footer-underline"></span>
            </h3>

            <p className="footer-newsletter-text">
              Subscribe for special offers and updates.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="footer-newsletter-form"
            >
              <input
                type="email"
                placeholder="Your Email Address"
                className="footer-input"
                required
              />

              <button type="submit" className="footer-subscribe-button">
                <FaCar className="footer-subscribe-icon" />
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="footer-copyright">
         <p>&copy; {CURRENT_YEAR} KARZONE. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-designer-link"
            >
              Karzone Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
