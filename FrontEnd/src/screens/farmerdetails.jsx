import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const FarmerDashboard = () => {
  const [farmer, setFarmer] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setFarmer(JSON.parse(storedUser));
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => setIsEditing(true);

  const handleSaveProfile = () => {
    setIsEditing(false);
    sessionStorage.setItem("user", JSON.stringify(farmer));
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4 text-center">Farmer Dashboard</h2>
      <div className="card p-4 shadow mt-3">
        <h3>Farmer Details</h3>
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={farmer.firstName}
              onChange={(e) =>
                setFarmer({ ...farmer, firstName: e.target.value })
              }
              placeholder="First Name"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={farmer.lastName}
              onChange={(e) =>
                setFarmer({ ...farmer, lastName: e.target.value })
              }
              placeholder="Last Name"
            />
            <input
              type="email"
              className="form-control mb-2"
              value={farmer.email}
              onChange={(e) => setFarmer({ ...farmer, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={farmer.contactNo}
              onChange={(e) =>
                setFarmer({ ...farmer, contactNo: e.target.value })
              }
              placeholder="Contact Number"
            />
            <button className="btn btn-success" onClick={handleSaveProfile}>
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {farmer.firstName} {farmer.lastName}
            </p>
            <p>
              <strong>Email:</strong> {farmer.email}
            </p>
            <p>
              <strong>Contact No:</strong> {farmer.contactNo}
            </p>
            {/* <button className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button> */}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FarmerDashboard;
