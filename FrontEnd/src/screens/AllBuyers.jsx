import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AllBuyers() {
  const [buyers, setBuyers] = useState([]);
  const navigate = useNavigate();

  // Fetch buyers from the backend with authentication
  const fetchBuyers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        return;
      }

      const response = await axios.get("https://localhost:7299/api/Buyer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
        sessionStorage.clear();
        window.location.href = "/Login";
      }
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">All Buyers</h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/AdminDashboard")}>Back to Admin Dashboard</button>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {buyers.length > 0 ? (
            buyers.map((buyer) => (
              <tr key={buyer.buyerId}>
                <td>{buyer.buyerId}</td>
                <td>{buyer.firstName} {buyer.lastName}</td>
                <td>{buyer.email}</td>
                <td>{buyer.contactNo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No buyers available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllBuyers;
