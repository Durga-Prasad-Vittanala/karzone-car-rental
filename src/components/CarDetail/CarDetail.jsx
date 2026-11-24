import React, { useState } from "react";
import carsData from "../Cars/carsData";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaCreditCard,
  FaEnvelope,
  FaGasPump,
  FaMapMarkedAlt,
  FaPhone,
  FaTachometerAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";

import "./CarDetail.css";

 // Today's date for date inputs
  const TODAY = new Date().toISOString().split("T")[0];
  

const CarDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const today = TODAY;
  // Get car from router state or carsData
  const car = location.state?.car || carsData.find((c) => String(c.id) === id);

  // Carousel state
  const [currentImage, setCurrentImage] = useState(0);

  // Booking form state
  const initialForm = {
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    name: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [activeField, setActiveField] = useState(null);

  // Car images
  const carImages = car ? [car.image, ...(car.images || [])] : [];

  // Transmission label
  const transmissionLabel = car?.transmission
    ? car.transmission.toLowerCase()
    : "standard";

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((fd) => ({
      ...fd,
      [name]: value,
    }));
  };

  // Calculate booking total
  const calculateTotal = () => {
    if (!car) return 0;

    const { pickupDate, returnDate } = formData;

    if (pickupDate && returnDate) {
      const days = Math.max(
        1,
        Math.ceil(
          (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24),
        ),
      );

      return days * car.price;
    }

    return car.price;
  };

  // Handle booking submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Data:", formData);

    toast.success("Booking confirmed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setFormData(initialForm);
  };

  // Input focus handlers
  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Show message if car is not available
  if (!car) {
    return (
      <div className="detail-page-container">
        <div className="detail-content-container">
          <p className="detail-car-name">Car not found.</p>
          <button className="detail-back-button" onClick={() => navigate(-1)}>
            <FaArrowLeft className="detail-back-button-icon" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Car specifications
  const specifications = [
    {
      Icon: FaUserFriends,
      label: "Seats",
      value: car.seats,
      iconClass: "seats-icon",
    },
    {
      Icon: FaGasPump,
      label: "Fuel",
      value: car.fuel,
      iconClass: "fuel-icon",
    },
    {
      Icon: FaTachometerAlt,
      label: "Mileage",
      value: car.mileage,
      iconClass: "mileage-icon",
    },
    {
      Icon: FaCheckCircle,
      label: "Transmission",
      value: transmissionLabel,
      iconClass: "transmission-icon",
    },
  ];

  return (
    <div className="detail-page-container">
      {/* MAIN CONTENT */}
      <div className="detail-content-container">
        <ToastContainer />

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          type="button"
        >
          <FaArrowLeft className="button-icon" />
        </button>

        <div className="detail-main-layout">
          {/* LEFT COLUMN */}
          <div className="detail-left-column">
            {/* IMAGE CAROUSEL */}
            <div className="image-carousel">
              <img
                src={carImages[currentImage]}
                alt={car.name}
                className="detail-car-image"
              />

              {carImages.length > 1 && (
                <div className="carousel-indicators">
                  {carImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImage(idx)}
                      className={`carousel-indicator ${
                        idx === currentImage ? "active" : ""
                      }`}
                      aria-label={`Show car image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* CAR NAME AND PRICE */}
            <h1 className="detail-car-name">{car.name}</h1>

            <p className="detail-car-price">
              ₹{car.price} <span className="price-per-day">/ day</span>
            </p>

            {/* CAR SPECIFICATIONS */}
            <div className="detail-specs-grid">
              {specifications.map((spec, index) => (
                <div className="detail-spec-card" key={index}>
                  <spec.Icon className={`detail-spec-icon ${spec.iconClass}`} />

                  <p className="detail-spec-label">{spec.label}</p>

                  <p className="detail-spec-value">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* ABOUT SECTION */}
            <div className="about-section">
              <h2 className="about-title">About this car</h2>

              <p className="about-text">
                Experience luxury in the {car.name}. With its{" "}
                {transmissionLabel} transmission and seating for {car.seats},
                every journey is exceptional.
              </p>

              <p className="about-text">
                {car.description ||
                  "This car combines performance and comfort for an unforgettable drive."}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="detail-right-column">
            <div className="booking-card">
              <h2 className="booking-title">
                Reserve <span className="booking-title1">Your Drive</span>
              </h2>

              <p className="booking-subtitle">
                Fast &middot; Secure &middot; Easy
              </p>

              {/* BOOKING FORM */}
              <form onSubmit={handleSubmit} className="booking-form">
                {/* DATE FIELDS */}
                <div className="booking-grid-2">
                  {/* PICKUP DATE */}
                  <div className="form-group">
                    <label htmlFor="pickupDate" className="form-label">
                      Pickup Date
                    </label>

                    <div
                      className={`input-container ${
                        activeField === "pickupDate" ? "active" : ""
                      }`}
                    >
                      <div className="input-icon">
                        <FaCalendarAlt />
                      </div>

                      <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        min={today}
                        value={formData.pickupDate}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("pickupDate")}
                        onBlur={handleBlur}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>

                  {/* RETURN DATE */}
                  <div className="form-group">
                    <label htmlFor="returnDate" className="form-label">
                      Return Date
                    </label>

                    <div
                      className={`input-container ${
                        activeField === "returnDate" ? "active" : ""
                      }`}
                    >
                      <div className="input-icon">
                        <FaCalendarAlt />
                      </div>

                      <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        min={formData.pickupDate || today}
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("returnDate")}
                        onBlur={handleBlur}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* PICKUP LOCATION */}
                <div className="form-group">
                  <label htmlFor="pickupLocation" className="form-label">
                    Pickup Location
                  </label>

                  <div
                    className={`input-container ${
                      activeField === "pickupLocation" ? "active" : ""
                    }`}
                  >
                    <div className="input-icon">
                      <FaMapMarkedAlt />
                    </div>

                    <input
                      type="text"
                      id="pickupLocation"
                      name="pickupLocation"
                      placeholder="Enter pickup location"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("pickupLocation")}
                      onBlur={handleBlur}
                      required
                      className="text-input-field"
                    />
                  </div>
                </div>

                {/* FULL NAME */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>

                  <div
                    className={`input-container ${
                      activeField === "name" ? "active" : ""
                    }`}
                  >
                    <div className="input-icon">
                      <FaUser />
                    </div>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      required
                      className="text-input-field"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>

                  <div
                    className={`input-container ${
                      activeField === "email" ? "active" : ""
                    }`}
                  >
                    <div className="input-icon">
                      <FaEnvelope />
                    </div>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      className="text-input-field"
                    />
                  </div>
                </div>

                {/* PHONE NUMBER */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>

                  <div
                    className={`input-container ${
                      activeField === "phone" ? "active" : ""
                    }`}
                  >
                    <div className="input-icon">
                      <FaPhone />
                    </div>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("phone")}
                      onBlur={handleBlur}
                      required
                      className="text-input-field"
                    />
                  </div>
                </div>

                {/* PRICE BREAKDOWN */}
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Rate/day</span>
                    <span>₹{car.price}</span>
                  </div>

                  {formData.pickupDate && formData.returnDate && (
                    <div className="price-row">
                      <span>Days</span>
                      <span>
                        {Math.max(
                          1,
                          Math.ceil(
                            (new Date(formData.returnDate) -
                              new Date(formData.pickupDate)) /
                              (1000 * 60 * 60 * 24),
                          ),
                        )}
                      </span>
                    </div>
                  )}

                  <div className="total-row">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                {/* CONFIRM BOOKING BUTTON */}
                <button type="submit" className="booking-submit-button">
                  <FaCreditCard className="booking-button-icon" />
                  <span>Confirm Booking</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
