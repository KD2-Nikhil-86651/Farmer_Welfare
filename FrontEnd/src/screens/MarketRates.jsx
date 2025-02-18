import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const MarketRates = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("https://localhost:7299/api/Crops");

        // ✅ Check if API response contains 'data'
        if (response.data && response.data.data) {
          setCrops(response.data.data);
        } else {
          setError("No crops found.");
        }
      } catch (err) {
        console.error("Error fetching crops:", err);
        setError("Failed to load market rates. Please try again.");
      } finally {
        setLoading(false); // ✅ Stop loading when API call completes
      }
    };

    fetchCrops();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="card shadow-sm"
        style={{ maxWidth: "600px", margin: "20px auto" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center mb-4" style={{ color: "#333" }}>
            Market Rates (₹ per Kg)
          </h5>

          {/* ✅ Show loading spinner while data is being fetched */}
          {loading && <p className="text-center">Loading...</p>}

          {/* ✅ Show error message if request fails */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* ✅ Show crops table if data is available */}
          {!loading && !error && (
            <table className="table table-bordered text-center">
              <thead className="thead-light">
                <tr>
                  <th>Crop</th>
                  <th>Rate per Kg (₹)</th>
                </tr>
              </thead>
              <tbody>
                {crops.length > 0 ? (
                  crops.map((crop) => (
                    <tr key={crop.cropId}>
                      <td>{crop.cropName}</td>
                      <td>₹{crop.rate}/kg</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No crops available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketRates;
