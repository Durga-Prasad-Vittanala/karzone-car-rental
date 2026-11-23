import React from "react";
import testimonials from "./Testimonialdata";
import {
  FaCar,
  FaQuoteLeft,
  FaStar,
  FaRoad,
  FaKey,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";

import "./Testimonial.css";

const Testimonial = () => {
  // Decorative icons for testimonial cards
  const icons = [FaCar, FaRoad, FaKey, FaMapMarkerAlt];

  return (
    <section className="testimonial-container">
      <div className="testimonial-inner">
        {/* HEADER SECTION */}
        <div className="testimonial-header">
          <div className="testimonial-badge">
            <FaCar className="testimonial-quote-icon" />
            <span className="testimonial-badge-text">
              {" "}
              Customer Experiences
            </span>
          </div>

          <h1 className="testimonial-title">
            Premium <span className="testimonial-accent">Drive</span>{" "}
            Experiences
          </h1>

          <div className="testimonial-divider">
            <div className="testimonial-divider-line"></div>

            <GiSteeringWheel className="testimonial-accent" size={24} />

            <div className="testimonial-divider-line"></div>
          </div>

          <p className="testimonial-subtitle">
            Hear from our valued customers about their journey with our premium
            fleet.
          </p>
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="testimonial-grid">
          {testimonials.map((t, index) => {
            const IconComponent = icons[index % icons.length];

            return (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-card-content">
                  {/* QUOTE AND RATING */}
                  <div className="testimonial-card-top">
                    <FaQuoteLeft className="testimonial-quote-icon" size={28} />

                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < t.rating
                              ? "testimonial-star"
                              : "testimonial-star inactive"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* CUSTOMER COMMENT */}
                  <p className="testimonial-comment">"{t.comment}"</p>

                  {/* CAR INFORMATION */}
                  <div className="testimonial-car-info">
                    <GiSteeringWheel
                      className="testimonial-car-icon"
                      size={20}
                    />

                    <span className="testimonial-car-text">{t.car}</span>
                  </div>

                  {/* CUSTOMER INFORMATION */}
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      {t.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="testimonial-author-info">
                      <h3 className="testimonial-author-name">{t.name}</h3>

                      <p className="testimonial-author-role">{t.role}</p>
                    </div>
                  </div>
                </div>

                {/* DECORATIVE ELEMENTS */}
                <div className="testimonial-decorative-corner"></div>

                <div className="testimonial-pattern-icon">
                  <IconComponent size={36} />
                </div>
              </div>
            );
          })}
        </div>

        {/* STATS SECTION */}
        <div className="testimonial-stats">
          <div className="testimonial-stats-grid">
            <div className="testimonial-stat-item">
              <div className="testimonial-stat-value stat-cyan">10k+</div>
              <div className="testimonial-stat-label stat-cyan-label">
                Happy Customers
              </div>
            </div>

            <div className="testimonial-stat-item">
              <div className="testimonial-stat-value stat-amber">250+</div>
              <div className="testimonial-stat-label stat-amber-label">
                Luxury Vehicles
              </div>
            </div>

            <div className="testimonial-stat-item">
              <div className="testimonial-stat-value stat-violet">24/7</div>
              <div className="testimonial-stat-label stat-violet-label">
                Support
              </div>
            </div>

            <div className="testimonial-stat-item">
              <div className="testimonial-stat-value stat-emerald">50+</div>
              <div className="testimonial-stat-label stat-emerald-label">
                Locations
              </div>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="testimonial-cta">
          <h2 className="testimonial-cta-title">
            Ready for Your Premium Experience?
          </h2>

          <p className="testimonial-cta-text">
            Join thousands of satisfied customers who have experienced our
            premium fleet and exceptional services.
          </p>

          <a href="/cars" className="testimonial-cta-button">
            Book Your Luxury Ride
          </a>
        </div>
      </div>

      {/* BOTTOM GRADIENT */}
      <div className="testimonial-bottom-gradient"></div>
    </section>
  );
};

export default Testimonial;
