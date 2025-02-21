import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar component

const About = () => {
  return (
    <div>
      {/* Add Navbar here */}
      <Navbar />

      <div className="container mt-5"><br /><br />
        <h2 className="text-center mb-4">About APMC</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <p style={{ fontSize: "18px" }}>
              The Agricultural Produce Market Committee (APMC) is an essential
              government institution that regulates the trading of agricultural
              produce in India. APMC aims to ensure fair prices for both
              farmers and buyers by facilitating organized markets for
              agricultural goods. The primary role of APMC is to promote
              transparency, better price discovery, and protect the interests of
              farmers.
            </p>
            <h5>Key Functions of APMC:</h5>
            <ul>
              <li>Regulate markets for agricultural produce.</li>
              <li>Ensure fair price discovery for farmers.</li>
              <li>Provide facilities for agricultural transactions.</li>
              <li>Assist farmers in selling their produce directly to buyers.</li>
            </ul>
            <p>
              APMC has been instrumental in streamlining agricultural trade in
              India, contributing to the welfare of farmers and ensuring that
              agricultural commodities reach consumers in a regulated manner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
