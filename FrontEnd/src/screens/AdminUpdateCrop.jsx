import React, { useState, useEffect } from "react";
import {
  getCrops,
  updateCropRate,
  getCropRateHistory,
} from "../service/CropService";
import { toast } from "react-toastify";

function AdminUpdateCrop() {
  const [crops, setCrops] = useState([]); // Store crop list
  const [selectedCrop, setSelectedCrop] = useState(""); // Selected crop ID
  const [newRate, setNewRate] = useState(""); // New rate input
  const [history, setHistory] = useState([]); // Store crop rate history
  const [loading, setLoading] = useState(false); // Loading state

  // ✅ Retrieve Admin Token from SessionStorage
  const adminToken = sessionStorage.getItem("token");
  console.log(adminToken);
  // ✅ Fetch Crops on Component Mount
  useEffect(() => {
    fetchCrops();
  }, []);

  // ✅ Fetch All Crops
  async function fetchCrops() {
    try {
      setLoading(true);
      console.log("Fetching crops from API...");
      const data = await getCrops();
      console.log("Crops fetched:", data);

      if (!Array.isArray(data)) {
        throw new Error("Invalid API response. Expected an array.");
      }

      setCrops(data);
    } catch (error) {
      console.error("Error fetching crops:", error);
      toast.error("Failed to fetch crops.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Fetch Crop Rate History
  async function fetchHistory(cropId) {
    const parsedCropId = parseInt(cropId, 10);

    if (!parsedCropId || isNaN(parsedCropId)) {
      console.warn("Invalid cropId received:", cropId);
      return;
    }

    try {
      console.log(`Fetching history for Crop ID: ${parsedCropId}`);
      const data = await getCropRateHistory(parsedCropId);
      console.log("History fetched:", data);
      setHistory(data);
    } catch (error) {
      console.error("Error fetching rate history:", error);
      toast.error("No rate history found.");
      setHistory([]);
    }
  }

  // ✅ Handle Update Button Click
  async function handleUpdate() {
    const parsedCropId = parseInt(selectedCrop, 10);
    const parsedNewRate = parseInt(newRate, 10);

    if (!parsedCropId || isNaN(parsedCropId)) {
      toast.error("Please select a valid crop.");
      console.error("Invalid Crop ID:", selectedCrop);
      return;
    }

    if (!parsedNewRate || isNaN(parsedNewRate) || parsedNewRate <= 0) {
      toast.error("Please enter a valid rate.");
      console.error("Invalid Rate:", newRate);
      return;
    }

    console.log("Sending Data:", {
      CropId: parsedCropId,
      NewRate: parsedNewRate,
      AdminToken: adminToken, // Debugging token
    });

    try {
      await updateCropRate(parsedCropId, parsedNewRate, adminToken);
      toast.success("Crop rate updated successfully!");

      fetchHistory(parsedCropId); // ✅ Refresh History
      fetchCrops(); // ✅ Refresh crop list
    } catch (error) {
      console.error("Error updating crop rate:", error);
      toast.error(error.message || "Failed to update crop rate.");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Admin - Update Crop Rate</h2>

      {/* Select Crop */}
      <div className="mb-3">
        <label>Select Crop</label>
        <select
          className="form-control"
          value={selectedCrop}
          onChange={(e) => {
            const cropId = parseInt(e.target.value, 10);
            setSelectedCrop(cropId);
            if (cropId > 0) fetchHistory(cropId);
          }}
        >
          <option value="">-- Select Crop --</option>
          {loading ? (
            <option disabled>Loading crops...</option>
          ) : (
            crops.map((crop) => (
              <option key={crop.cropId} value={crop.cropId}>
                {crop.cropName} - ₹{crop.rate}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Enter New Rate */}
      <div className="mb-3">
        <label>New Rate (₹)</label>
        <input
          type="number"
          className="form-control"
          value={newRate}
          onChange={(e) => setNewRate(e.target.value)}
          placeholder="Enter new rate"
        />
      </div>

      {/* Update Button */}
      <button className="btn btn-primary mt-2" onClick={handleUpdate}>
        Update Rate
      </button>

      {/* Display Crop Rate History */}
      {history.length > 0 && (
        <div className="mt-4">
          <h4>Rate Update History</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Old Rate (₹)</th>
                <th>Updated By</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.rateDate).toLocaleDateString()}</td>
                  <td>₹{entry.rate}</td>
                  <td>{entry.updatedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUpdateCrop;
