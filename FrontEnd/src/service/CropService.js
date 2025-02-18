// import axios from "axios";

// const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// // ✅ Get all crops
// export async function getCrops() {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     return response.data.data; // Returns crop list
//   } catch (error) {
//     console.error("Error fetching crops:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Update crop rate (Admin only) - Sending token in headers
// export async function updateCropRate(cropId, newRate, adminToken) {
//   try {
//     console.log("Sending Update Request:", { cropId, newRate, adminToken });

//     const response = await axios.post(
//       `${API_URL}/update-rate`,
//       {
//         CropId: cropId,
//         NewRate: newRate,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${adminToken}`, // Ensure token is sent
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Update response:", response.data); // Debugging purpose
//     return response.data;
//   } catch (error) {
//     console.error("Error updating crop rate:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Get crop rate history
// export async function getCropRateHistory(cropId) {
//   try {
//     const response = await axios.get(`${API_URL}/rate-history/${cropId}`);
//     return response.data.data; // Returns history list
//   } catch (error) {
//     console.error("Error fetching rate history:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }
//***************************************************************************************************************************** */
// import axios from "axios";

// const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// // ✅ Get all crops
// export async function getCrops() {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     return response.data.data; // Returns crop list
//   } catch (error) {
//     console.error("Error fetching crops:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Update crop rate (Admin only)
// export async function updateCropRate(cropId, newRate, adminUser) {
//   try {
//     const response = await axios.post(`${API_URL}/update-rate`, {
//       CropId: cropId,
//       NewRate: newRate,
//       AdminUser: adminUser,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating crop rate:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Get crop rate history
// export async function getCropRateHistory(cropId) {
//   try {
//     const response = await axios.get(`${API_URL}/rate-history/${cropId}`);
//     return response.data.data; // Returns history list
//   } catch (error) {
//     console.error(
//       "Error fetching rate history:",
//       error.response?.data || error
//     );
//     throw error.response?.data || error;
//   }
// }
//******************************************************************************************************************* */
// import axios from "axios";

// const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// // ✅ Get admin token from sessionStorage
// const getAuthHeaders = () => {
//   const token = sessionStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {}; // ✅ Send token in the headers
// };

// // ✅ Get all crops
// export async function getCrops() {
//   try {
//     const response = await axios.get(`${API_URL}`, { headers: getAuthHeaders() });
//     return response.data.data; // Returns crop list
//   } catch (error) {
//     console.error("Error fetching crops:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Update crop rate (Admin only)
// export async function updateCropRate(cropId, newRate) {
//   try {
//     const response = await axios.post(
//       `${API_URL}/update-rate`,
//       { cropId, newRate }, // Send cropId and newRate in body
//       { headers: getAuthHeaders() } // ✅ Send token in headers
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating crop rate:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Get crop rate history
// export async function getCropRateHistory(cropId) {
//   try {
//     const response = await axios.get(`${API_URL}/rate-history/${cropId}`, { headers: getAuthHeaders() });
//     return response.data.data; // Returns history list
//   } catch (error) {
//     console.error("Error fetching rate history:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// import axios from "axios";

// const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// // ✅ Get admin token & name from sessionStorage
// const getAuthHeaders = () => {
//   const token = sessionStorage.getItem("token");
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // ✅ Get all crops from backend
// export async function getCrops() {
//   try {
//     console.log("Fetching crops...");
//     const response = await axios.get(`${API_URL}`, { headers: getAuthHeaders() });

//     if (response.data && response.data.data) {
//       console.log("Crops retrieved:", response.data.data);
//       return response.data.data; // Returns crop list
//     } else {
//       throw new Error("Invalid response from server.");
//     }
//   } catch (error) {
//     console.error("Error fetching crops:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Update crop rate (Admin only)
// export async function updateCropRate(cropId, newRate) {
//   const adminUser = sessionStorage.getItem("username"); // ✅ Retrieve admin username

//   if (!adminUser) {
//     throw new Error("Admin username is missing. Please log in again.");
//   }

//   try {
//     console.log(`Updating crop ID: ${cropId} with new rate: ₹${newRate}`);

//     const response = await axios.post(
//       `${API_URL}/update-rate`,
//       { cropId, newRate, adminUser }, // ✅ Send cropId, newRate, and adminUser
//       { headers: getAuthHeaders() } // ✅ Include token in headers
//     );

//     console.log("Crop rate updated successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating crop rate:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Get crop rate history
// export async function getCropRateHistory(cropId) {
//   try {
//     console.log(`Fetching rate history for crop ID: ${cropId}`);

//     const response = await axios.get(`${API_URL}/rate-history/${cropId}`, { headers: getAuthHeaders() });

//     if (response.data && response.data.data) {
//       console.log("Rate history retrieved:", response.data.data);
//       return response.data.data; // Returns history list
//     } else {
//       throw new Error("Invalid response from server.");
//     }
//   } catch (error) {
//     console.error("Error fetching rate history:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }


// import axios from "axios";

// const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// // ✅ Get all crops
// export async function getCrops() {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     return response.data.data; // Returns crop list
//   } catch (error) {
//     console.error("Error fetching crops:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Update crop rate (Admin only)
// export async function updateCropRate(cropId, newRate) {
//   try {
//     const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
//     const user = JSON.parse(sessionStorage.getItem("user")); // Retrieve user object

//     if (!token || !user || user.role !== "Admin") {
//       throw new Error("Unauthorized: Only admins can update crop rates.");
//     }

//     const response = await axios.post(
//       `${API_URL}/update-rate`,
//       {
//         CropId: cropId,
//         NewRate: newRate,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating crop rate:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Get crop rate history
// export async function getCropRateHistory(cropId) {
//   try {
//     const response = await axios.get(`${API_URL}/rate-history/${cropId}`);
//     return response.data.data; // Returns history list
//   } catch (error) {
//     console.error(
//       "Error fetching rate history:",
//       error.response?.data || error
//     );
//     throw error.response?.data || error;
//   }
// }


// import axios from "axios";

// const API_URL = "https://localhost:7299/api/Crops"; // Adjust this based on your backend

// // ✅ Get all crops
// export async function getCrops() {
//   try {
//     const response = await axios.get(`${API_URL}`);
//     return response.data.data; // Returns crop list
//   } catch (error) {
//     console.error("Error fetching crops:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Update crop rate (Admin only)
// export async function updateCropRate(cropId, newRate) {
//   try {
//     const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
//     const user = JSON.parse(sessionStorage.getItem("user")); // Retrieve user object

//     if (!token || !user || user.role !== "Admin") {
//       throw new Error("Unauthorized: Only admins can update crop rates.");
//     }

//     const response = await axios.post(
//       `${API_URL}/update-rate`,
//       {
//         CropId: cropId,
//         NewRate: newRate,
//         ContactNo: user.contactNo, // ✅ Include Contact Number
//         Role: user.role, // ✅ Include Role
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating crop rate:", error.response?.data || error);
//     throw error.response?.data || error;
//   }
// }

// // ✅ Get crop rate history
// export async function getCropRateHistory(cropId) {
//   try {
//     const response = await axios.get(`${API_URL}/rate-history/${cropId}`);
//     return response.data.data; // Returns history list
//   } catch (error) {
//     console.error(
//       "Error fetching rate history:",
//       error.response?.data || error
//     );
//     throw error.response?.data || error;
//   }
// }


// 
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
