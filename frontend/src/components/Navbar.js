import React from "react";
import { Link } from "react-router-dom"; // 👈 Don't forget this import

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-container">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BBMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse navbar" id="navbarNavAltMarkup">
          <div className="navbar-nav navbar-child" >
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/BloodStock">
              Blood Stock
            </Link>
            <Link className="nav-link" to="/Hospitals">
              Hospitals
            </Link>
            <Link className="nav-link" to="/CustomQuery">
              Custom Query
            </Link>
            <Link className="nav-link" to="/AboutUs">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
