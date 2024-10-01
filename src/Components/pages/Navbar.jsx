import React, { useEffect } from "react";
import "../pages/Home/Home.css";
import { useNavigate } from "react-router-dom";
import FetchService from "../Auth/services/FetchService";
import Image from "../Image/Image";

const Navbar = () => {
  const { data: userData } = FetchService("/found-user");
  const isAuthenticated = localStorage.getItem("auth") !== null;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    if(! localStorage.removeItem("auth") ||  localStorage.removeItem("auth") === undefined ||  localStorage.removeItem("auth") === null){
      navigate("/login")
    }
    navigate("/login");
  };
    
  return (
    <header className="home-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="home-title" onClick={() => navigate("/")}>
            Welcome to Book Haven
          </h1>
          <p className="home-subtitle">
            Explore your favorite books, anytime, anywhere.
          </p>
        </div>

        <div className="header-right">
          <div className="profile-container">
            <img
              src={userData?.data?.userRecord?.image && userData?.data?.userRecord?.image}
              alt="Profile"
              className="profile-image"
            />

            <div className="profile-dropdown">
              <button className="profile-name">
                {userData?.data?.userRecord.email} ▼
              </button>
              <div className="dropdown-menu">
                 
                  <button onClick={handleLogout} className="logout-button">
                 {isAuthenticated ? "Logout":"Login"}   
                  </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
