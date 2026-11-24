import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/SignUp.jsx";
import ContactPages from "./pages/ContactPages";
import CarPage from "./pages/CarPage";
import { FaArrowUp } from "react-icons/fa";
import CarDetailPage from "./pages/CarDetailPage";
import "./App.css";

//PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return (
  <Navigate
    to="/login"
    replace
    state={{
      from: location.pathname,
      car: location.state?.car,
    }}
  />
);
  }
  return children;
};

const App = () => {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, [location.pathname]);

  //SHOW HIDE BTN ON SCROLL
  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };

  return (
    <div>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<ContactPages />} />
          <Route path="/cars" element={<CarPage />} />

          <Route
            path="/cars/:id"
            element={
              <ProtectedRoute>
                <CarDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        {showButton && (
          <button
            onClick={scrollUp}
            className="scroll-top-button"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </>
    </div>
  );
};

export default App;
