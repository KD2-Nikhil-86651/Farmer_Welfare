import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Navbar from "../components/Navbar";
import axios from "axios";

function AllShopkeepers() {
  const [shopkeepers, setShopkeepers] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Fetch shopkeepers from the backend with authentication
  const fetchShopkeepers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        return;
      }

      const response = await axios.get("https://localhost:7299/api/Shopkeeper", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShopkeepers(response.data);
    } catch (error) {
      console.error("Error fetching shopkeepers:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
        sessionStorage.clear();
        window.location.href = "/Login";
      }
    }
  };

  useEffect(() => {
    fetchShopkeepers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">All Shopkeepers</h2>
      <button 
        className="btn btn-secondary mb-3" 
        onClick={() => navigate("/AdminDashboard")} // ✅ Now works correctly
      >
        Back to Admin Dashboard
      </button>
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
          {shopkeepers.length > 0 ? (
            shopkeepers.map((shopkeeper) => (
              <tr key={shopkeeper.shopkeeperId}>
                <td>{shopkeeper.shopkeeperId}</td>
                <td>{shopkeeper.firstName} {shopkeeper.lastName}</td>
                <td>{shopkeeper.email}</td>
                <td>{shopkeeper.contactNo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No shopkeepers available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllShopkeepers;
