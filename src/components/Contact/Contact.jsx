import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaMapMarkedAlt,
  FaWhatsapp,
  FaUser,
  FaPhone,
  FaCar,
  FaComment,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    message: "",
  });

  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // WhatsApp form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Car Type: ${formData.carType}
Message: ${formData.message}
    `;

    const whatsappURL = `https://wa.me/918299431275?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    setFormData({
      name: "",
      email: "",
      phone: "",
      carType: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "+91 8299431275",
      color: "contact-icon-whatsapp",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "contact@karzoneservices.com",
      color: "contact-icon-email",
    },
    {
      icon: FaClock,
      label: "Hours",
      value: "Mon-Sat: 8AM-8PM",
      color: "contact-icon-hours",
    },
  ];

  const fields = ["name", "email", "phone", "carType"];

  const icons = {
    name: FaUser,
    email: FaEnvelope,
    phone: FaPhone,
    carType: FaCar,
  };

  const placeholders = {
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    carType: "Select Car Type",
  };

  return (
    <div className="contact-container">
      {/* MAIN CONTENT */}
      <div className="contact-content">
        {/* TITLE */}
        <div className="contact-title-container">
          <h1 className="contact-title">Contact Our Team</h1>
          <div className="contact-divider"></div>

          <p className="contact-subtitle">
            Have questions about our premium fleet? Our team is ready to assist
            with your car rental needs.
          </p>
        </div>

        <div className="contact-card-container">
          {/* INFORMATION CARD */}
          <div className="contact-info-card">
            <div className="contact-info-circle-1"></div>
            <div className="contact-info-circle-2"></div>

            <div className="contact-info-inner">
              <h2 className="contact-info-title">
                <FaMapMarkedAlt className="contact-info-icon" />
                Our Information
              </h2>

              <div className="contact-info-item-container">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;

                  return (
                    <div className="contact-info-item" key={info.label}>
                      <div className={`contact-icon-container ${info.color}`}>
                        <Icon className="contact-detail-icon" />
                      </div>

                      <div>
                        <h3 className="contact-info-label">{info.label}</h3>

                        <p className="contact-info-value">
                          {info.value}

                          {index === 2 && (
                            <span className="contact-sunday-hours">
                              Sunday: 10AM-6PM
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SPECIAL OFFER */}
              <div className="contact-offer-container">
                <div className="contact-offer-heading">
                  <FaCalendarAlt className="contact-offer-icon" />
                  <span className="contact-offer-title">Special Offer!</span>
                </div>

                <p className="contact-offer-text">
                  Book for 3+ days and get 10% discount.
                </p>
              </div>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="contact-form-card">
            <div className="contact-form-circle-1"></div>
            <div className="contact-form-circle-2"></div>

            <div className="contact-form-inner">
              <div className="contact-form-header">
                <h2 className="contact-form-title">
                  <IoIosSend className="contact-info-icon" />
                  Send Your Inquiry
                </h2>

                <p className="contact-form-subtitle">
                  Fill out the form and we'll get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                {/* INPUT FIELDS */}
                <div className="contact-form-grid">
                  {fields.map((field) => {
                    const Icon = icons[field];

                    return (
                      <div key={field} className="contact-input-container">
                        <div className="contact-input-icon">
                          <Icon />
                        </div>

                        {field !== "carType" ? (
                          <input
                            type={
                              field === "email"
                                ? "email"
                                : field === "phone"
                                  ? "tel"
                                  : "text"
                            }
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onFocus={() => handleFocus(field)}
                            onBlur={handleBlur}
                            required
                            placeholder={placeholders[field]}
                            className={`contact-input ${
                              activeField === field ? "is-active" : ""
                            }`}
                          />
                        ) : (
                          <select
                            name="carType"
                            value={formData.carType}
                            onChange={handleChange}
                            onFocus={() => handleFocus(field)}
                            onBlur={handleBlur}
                            required
                            className={`contact-select ${
                              activeField === field ? "is-active" : ""
                            }`}
                          >
                            <option value="">Select Car Type</option>

                            {[
                              "Economy",
                              "SUV",
                              "Luxury",
                              "Van",
                              "Sports Car",
                              "Convertible",
                            ].map((option) => (
                              <option value={option} key={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* MESSAGE */}
                <div className="contact-message-container">
                  <div className="contact-textarea-icon">
                    <FaComment />
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    required
                    rows={3}
                    placeholder="Tell us about your rental needs..."
                    className={`contact-textarea ${
                      activeField === "message" ? "is-active" : ""
                    }`}
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button type="submit" className="contact-submit-button">
                  Send Message
                  <FaWhatsapp className="contact-whatsapp-icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
