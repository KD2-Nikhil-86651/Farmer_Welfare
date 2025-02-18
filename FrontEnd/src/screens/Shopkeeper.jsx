import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Shopkeeper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user details from session storage
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Convert string back to object
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Inline Styles
  const containerStyle = {
    marginTop: "40px", // Space between Navbar and content
  };

  const cardStyle = {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adding shadow effect
    padding: "20px",
    borderRadius: "10px",
  };

  return (
    <div className="container">
      <Navbar />
      <div style={containerStyle}>
        {" "}
        {/* Applied margin-top for spacing */}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h3 className="text-center mb-3">Shopkeeper Profile</h3>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Name:</strong> {user.firstName} {user.lastName}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {user.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Contact No:</strong> {user.contactNo}
                  </li>
                  <li className="list-group-item">
                    <strong>Role:</strong> {user.role}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopkeeper;
