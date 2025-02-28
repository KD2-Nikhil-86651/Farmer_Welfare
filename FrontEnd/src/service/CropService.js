import axios from "axios";

const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// ✅ Get all crops
export async function getCrops() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.data; // Returns crop list
  } catch (error) {
    console.error("Error fetching crops:", error.response?.data || error);
    throw error.response?.data || error;
  }
}

// ✅ Update crop rate (Admin only)
export async function updateCropRate(cropId, newRate) {
  try {
    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user")); // Retrieve user object

    if (!token || !user || user.role !== "Admin") {
      throw new Error("Unauthorized: Only admins can update crop rates.");
    }

    console.log("🔹 Sending Data:", {
      CropId: cropId,
      NewRate: newRate,
      ContactNo: user.contactNo,
      Role: user.role,
    });

    const response = await axios.post(
      `${API_URL}/update-rate`,
      {
        CropId: cropId,
        NewRate: newRate,
        ContactNo: user.contactNo, // ✅ Ensure correct field name
        Role: user.role, // ✅ Ensure correct field name
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating crop rate:", error.response?.data || error);
    throw error.response?.data || error;
  }
}

// ✅ Get crop rate history
export async function getCropRateHistory(cropId) {
  try {
    const response = await axios.get(`${API_URL}/rate-history/${cropId}`);
    return response.data.data; // Returns history list
  } catch (error) {
    console.error(
      "Error fetching rate history:",
      error.response?.data || error
    );
    throw error.response?.data || error;
  }
}
