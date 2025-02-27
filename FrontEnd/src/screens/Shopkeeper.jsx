import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Shopkeeper = () => {
  const [user, setUser] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchFarmers = async () => {
    setLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/farmers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFarmers(response.data);
    } catch (error) {
      console.error("Error fetching farmers:", error);
      setError("Failed to load farmers data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">Shopkeeper Dashboard</h2>
      <div className="card p-4 shadow mt-3">
        <h3>Shopkeeper Details</h3>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Contact No:</strong> {user.contactNo}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
 

      <div className="mt-3">
        <Link to="/AllFarmer" className="btn btn-success">
          View Farmers (All)
        </Link>
      </div>
    </div>
  );
};

export default Shopkeeper;
