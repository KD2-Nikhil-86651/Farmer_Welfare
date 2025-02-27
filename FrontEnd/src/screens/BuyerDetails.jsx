import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const BuyerDetails = () => {
  const [buyer, setBuyer] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    role: "Buyer",
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setBuyer(JSON.parse(storedUser));
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => setIsEditing(true);

  const handleSaveProfile = () => {
    setIsEditing(false);
    sessionStorage.setItem("user", JSON.stringify(buyer));
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4 text-center">Buyer Dashboard</h2>
      <div className="card p-4 shadow mt-3">
        <h3>Buyer Details</h3>
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={buyer.firstName}
              onChange={(e) =>
                setBuyer({ ...buyer, firstName: e.target.value })
              }
              placeholder="First Name"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={buyer.lastName}
              onChange={(e) => setBuyer({ ...buyer, lastName: e.target.value })}
              placeholder="Last Name"
            />
            <input
              type="email"
              className="form-control mb-2"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={buyer.contactNo}
              onChange={(e) =>
                setBuyer({ ...buyer, contactNo: e.target.value })
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
              <strong>Name:</strong> {buyer.firstName} {buyer.lastName}
            </p>
            <p>
              <strong>Email:</strong> {buyer.email}
            </p>
            <p>
              <strong>Contact No:</strong> {buyer.contactNo}
            </p>
            {/* <button className="btn btn-primary" onClick={handleEditProfile}>
              Edit Profile
            </button> */}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BuyerDetails;
