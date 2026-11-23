import React, { useState, useEffect } from "react";
import carsData from "./HcarsData";
import { useNavigate } from "react-router-dom";

import { ArrowRight, Zap, Users, Fuel, Gauge, CheckCircle } from "lucide-react";

import "./HomeCars.css";

const HomeCars = () => {
  const navigate = useNavigate();

  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const visibleCars = carsData.slice(0, 6);

  const specifications = [
    { icon: Users, key: "seats", label: "Seats" },
    { icon: Fuel, key: "fuel", label: "Fuel" },
    { icon: Gauge, key: "mileage", label: "Mileage" },
    { icon: CheckCircle, key: "transmission", label: "Trans" },
  ];

  return (
    <section className="home-cars-container">
      {/* HEADER */}
      <div className="home-cars-header">
        <div className="premium-badge">
          <Zap className="premium-icon" />

          <span className="premium-text">Premium Fleet Selection</span>
        </div>

        <h1 className="home-cars-title">Luxury Car Collection</h1>

        <p className="home-cars-subtitle">
          Discover premium vehicles with exceptional performance and comfort for
          your next journey.
        </p>
      </div>

      {/* CARS GRID */}
      <div className="home-cars-grid">
        {visibleCars.map((car, idx) => (
          <div
            key={car.id}
            className={`home-car-card ${
              animateCards ? "visible-card" : "hidden-card"
            }`}
            onMouseEnter={() => setHoveredCard(car.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              transitionDelay: `${animateCards ? idx * 100 : 0}ms`,
            }}
          >
            {/* PRICE */}
            <div className="car-price-badge">₹{car.price}/day</div>

            {/* IMAGE */}
            <div className="car-image-container">
              <img
                src={car.image}
                alt={car.name}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />

              <div
                className="car-image-placeholder"
                style={{ display: "none" }}
              >
                Image not available
              </div>
            </div>

            {/* CONTENT */}
            <div className="car-content">
              <div className="car-heading">
                <div>
                  <h3 className="car-name">{car.name}</h3>

                  <div className="car-info">
                    <span className="car-type-badge">{car.type}</span>
                  </div>

                  <p className="car-description">{car.description}</p>
                </div>
              </div>

              {/* SPECIFICATIONS */}
              <div className="car-specs-grid">
                {specifications.map((spec) => {
                  const Icon = spec.icon;
                  const isHovered = hoveredCard === car.id;

                  return (
                    <div key={spec.key} className="car-spec-item">
                      <div
                        className={`car-spec-icon-container ${
                          isHovered ? "active" : ""
                        }`}
                      >
                        <Icon className="car-spec-icon" />
                      </div>

                      <span className="car-spec-value">{car[spec.key]}</span>

                      <span className="car-spec-label">{spec.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* BOOK BUTTON */}
              <button
                onClick={() =>
                  navigate(`/cars/${car.id}`, {
                    state: { car },
                  })
                }
                className="metal-btn"
              >
                Book Now
                <ArrowRight className="car-button-icon" />
              </button>
            </div>

            <div className="car-accent-blur" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCars;
