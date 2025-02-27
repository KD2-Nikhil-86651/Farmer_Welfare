
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import axios from "axios";

// function AllFarmer() {
//   const [farmers, setFarmers] = useState([]);

//   // Fetch farmers from the backend
//   const fetchFarmers = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       const response = await axios.get("https://localhost:7299/api/Farmer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFarmers(response.data);
//     } catch (error) {
//       console.error("Error fetching farmers:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFarmers(); // Fetch farmers on component mount
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />
//       <h2 className="mt-4">All Farmers</h2>
//       <table className="table table-bordered mt-3">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Contact No</th>
//           </tr>
//         </thead>
//         <tbody>
//           {farmers.length > 0 ? (
//             farmers.map((farmer) => (
//               <tr key={farmer.farmerId}>
//                 <td>{farmer.farmerId}</td>
//                 <td>{farmer.firstName} {farmer.lastName}</td>
//                 <td>{farmer.email}</td>
//                 <td>{farmer.contactNo}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 No farmers available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AllFarmer;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Navbar from "../components/Navbar";
import axios from "axios";

function AllFarmer() {
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigate

  // Fetch farmers from the backend with authentication
  const fetchFarmers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        return;
      }

      const response = await axios.get("https://localhost:7299/api/Farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmers(response.data);
    } catch (error) {
      console.error("Error fetching farmers:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized! Please log in again.");
        sessionStorage.clear();
        window.location.href = "/Login";
      }
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">All Farmers</h2>
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
          {farmers.length > 0 ? (
            farmers.map((farmer) => (
              <tr key={farmer.farmerId}>
                <td>{farmer.farmerId}</td>
                <td>
                  {farmer.firstName} {farmer.lastName}
                </td>
                <td>{farmer.email}</td>
                <td>{farmer.contactNo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No farmers available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllFarmer;
