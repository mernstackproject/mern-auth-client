import React from "react";
import "../pages/Home/Home.css";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../Features/apislice";
import Image from "../Image/Image";
const Navbar = () => {
  const {isLoading, data:userData, isError} = useGetUsersQuery()
  const navigate = useNavigate();
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
            <Image
              src={userData?.data?.userRecord?.image}
              alt="Profile"
              className="profile-image"
            />

            <div className="profile-dropdown">
              <button className="profile-name">
                {userData?.data?.userRecord.email} ▼{" "}
                {/* Adjusted based on userData structure */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
