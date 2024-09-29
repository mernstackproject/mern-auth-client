import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import Image from "../../Image/Image";
import Navbar from "../Navbar";
const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("auth") !== null;
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className="home-container">
        <section className="books-section">
          <h2 className="section-title">Top Picks for You</h2>

          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              localStorage.getItem("auth") !== null
                ? navigate("/books")
                : navigate("login")
            }
            className="books-grid"
          >
            <div className="book-card">
              <Image
                src="https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
                alt="Book 1"
                className="book-image"
              />
              <p className="book-title">Book Title 1</p>
            </div>
            <div className="book-card">
              <Image
                src="https://images.unsplash.com/photo-1521056787327-165dc2a32836?w=500&auto=forma  t&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2tzfGVufDB8fDB8fHww"
                alt="Book 2"
                className="book-image"
              />
              <p className="book-title">Book Title 2</p>
            </div>
            <div className="book-card">
              <Image
                src="https://images.unsplash.com/photo-1519163219899-21d2bb723b3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGJvb2tzfGVufDB8fDB8fHww"
                alt="Book 3"
                className="book-image"
              />
              <p className="book-title">Book Title 3</p>
            </div>
            <div className="book-card">
              <Image
                src="https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Book 4"
                className="book-image"
              />
              <p className="book-title">Book Title 4</p>
            </div>
          </div>
        </section>
        <section className="auth-section">
          <h3 className="auth-text">Join Us Now</h3>
          <div className="auth-buttons">
            <Link onClick={handleLogout} to="/login" className="btn">
              {isAuthenticated ? "Logout" : "Login"}
            </Link>
            {isAuthenticated ? (
              ""
            ) : (
              <Link to="/register" className="btn btn-alt">
                Register
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
