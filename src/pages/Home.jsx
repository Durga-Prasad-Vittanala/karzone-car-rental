import React from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import HomeBanner from "../components/HomeBanner/HomeBanner.jsx";
import HomeCars from "../components/HomeCars/HomeCars.jsx";
import Testimonial from "../components/Testimonial/Testimonial.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <HomeCars />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
