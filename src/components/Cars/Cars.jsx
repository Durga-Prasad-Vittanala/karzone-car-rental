import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaGasPump,
  FaTachometerAlt,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

import carsData from "./carsData";
import "./Cars.css";

const Cars = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Main Content */}
      <div className="content-container">
        {/* Header */}
        <div className="header-container">
          <h1 className="title">Premium Car Collection</h1>

          <p className="subtitle">
            Discover our exclusive fleet of luxury vehicles. Each car is
            meticulously maintained and ready for your journey.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid-container">
          {carsData.map((car) => (
            <div key={car.id} className="car-card">
              <div className="glow-effect"></div>

              {/* Car Image */}
              <div className="image-container">
                <div className="image-overlay"></div>

                <img src={car.image} alt={car.name} className="car-image" />

                <div className="price-badge">${car.price}/day</div>
              </div>

              {/* Car Details */}
              <div className="card-content">
                <div className="header-row">
                  <div>
                    <h3 className="car-name">{car.name}</h3>
                    <p className="car-type">{car.type}</p>
                  </div>
                </div>

                {/* Car Specifications */}
                <div className="specs-grid">
                  <div className="spec-item">
                    <div className="spec-icon-container seats-icon">
                      <FaUserFriends />
                    </div>
                    <span>{car.seats} Seats</span>
                  </div>

                  <div className="spec-item">
                    <div className="spec-icon-container fuel-icon">
                      <FaGasPump />
                    </div>
                    <span>{car.fuel}</span>
                  </div>

                  <div className="spec-item">
                    <div className="spec-icon-container mileage-icon">
                      <FaTachometerAlt />
                    </div>
                    <span>{car.mileage}</span>
                  </div>

                  <div className="spec-item">
                    <div className="spec-icon-container shield-icon">
                      <FaShieldAlt />
                    </div>
                    <span>Premium</span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/cars/${car.id}`, {
                      state: { car },
                    })
                  }
                  className="metal-btn"
                >
                  Book Now
                  <FaArrowRight className="metal-btn-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Background Decorations */}
        <div className="decor1"></div>
        <div className="decor2"></div>
      </div>
    </div>
  );
};

export default Cars;
