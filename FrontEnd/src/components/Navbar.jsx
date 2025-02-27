import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import custom CSS for additional styling

function Navbar() {
  const navigate = useNavigate();

  // Retrieve token and role from sessionStorage
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate("/Login"); // Redirect to login page
  };

  // Function to generate role-based navigation links
  const getRoleBasedLinks = () => {
    switch (role) {
      case "Admin":
        return (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/AdminDashboard">
                Admin Details
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AdminUpdateCrop">
                Update Crop Rate
              </Link>
            </li>
          </>
        );
      case "Farmer":
        return (
          <li className="nav-item">
            <Link className="nav-link" to="/FarmerDetails">
              Farmer Details
            </Link>
          </li>
        );
      case "Shopkeeper":
        return (
          <li className="nav-item">
            <Link className="nav-link" to="/Shopkeeper">
              Shopkeeper Details
            </Link>
          </li>
        );
      case "Buyer":
        return (
          <li className="nav-item">
            <Link className="nav-link" to="/BuyerDetails">
              Buyer Details
            </Link>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top w-100">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/HomePage">
          FARMER WELFARE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/HomePage">
                Home
              </Link>
            </li>
            {getRoleBasedLinks()}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/MarketRates">
                Market Rates
              </Link>
            </li>
            {role !== "Admin" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/Feedback">
                  Feedback
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/About">
                About APMC
              </Link>
            </li>
            {/* Show Login & Register only if user is NOT logged in */}
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/Register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger text-white ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
