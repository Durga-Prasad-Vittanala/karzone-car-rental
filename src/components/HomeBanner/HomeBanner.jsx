import { Link } from "react-router-dom";
import "./HomeBanner.css";
import hero from "../../assets/hero.png";

export default function HeroSleek() {
  return (
    <section className="karzone-hero">
      {/* Background car image */}
      <div className="karzone-hero-background">
        <img
          src={hero}
          alt="Futuristic luxury sports car"
          className="karzone-hero-car"
        />
      </div>

      {/* Dark overlay */}
      <div className="karzone-hero-overlay"></div>

      {/* Center glass card */}
      <div className="karzone-glass-card">
        <div className="karzone-hero-text">
          <span className="karzone-label">KARZONE</span>

          <h1>Next-gen fleet. Instant drive.</h1>

          <p>Rent Your Dream Car. Transparent pricing. Book in seconds.</p>
        </div>

        <Link to="/cars" className="karzone-see-fleet">
          See fleet
        </Link>
      </div>
    </section>
  );
}
