import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar from the components folder
import MarketRates from "./MarketRates"; // Import MarketRates from the same folder as HomePage

function HomePage() {
  return (
    <div
      className="min-h-screen bg-light"
      style={{
        backgroundColor: "#f8f9fa", // Lighter background color for simplicity
      }}
    >
      <Navbar />

      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <h1
          className="text-center font-weight-bold mb-4"
          style={{ color: "#333" }}
        ><br /><br />
          Welcome to Farmer Welfare
        </h1>
        <p className="text-center mb-6" style={{ color: "#555" }}>
          Explore market rates, feedback, and essential tools for farmers. A
          platform dedicated to empowering the backbone of our nation.
        </p>

        {/* Add Market Rates Table here */}
        <div className="mt-4 w-75 mx-auto">
          <MarketRates /> {/* This will render the Market Rates table */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
