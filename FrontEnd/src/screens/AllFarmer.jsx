// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
// import Navbar from "../components/Navbar";
// import axios from "axios";

// function AllFarmer() {
//   const [farmers, setFarmers] = useState([]);
//   const navigate = useNavigate(); // ✅ Initialize navigate

//   // Fetch farmers from the backend with authentication
//   const fetchFarmers = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         console.error("No token found. Redirecting to login.");
//         return;
//       }

//       const response = await axios.get("https://localhost:7299/api/Farmer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFarmers(response.data);
//     } catch (error) {
//       console.error("Error fetching farmers:", error);
//       if (error.response && error.response.status === 401) {
//         alert("Unauthorized! Please log in again.");
//         sessionStorage.clear();
//         window.location.href = "/Login";
//       }
//     }
//   };

//   useEffect(() => {
//     fetchFarmers();
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
//                 <td>
//                   {farmer.firstName} {farmer.lastName}
//                 </td>
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


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import Toastify from "toastify-js"; // ✅ Import Toastify for notifications

// function AllFarmer() {
//   const [farmers, setFarmers] = useState([]);
//   const [userRole, setUserRole] = useState(""); // Track user role (Admin or Shopkeeper)
//   const navigate = useNavigate(); // ✅ Initialize navigate

//   // Fetch farmers from the backend with authentication
//   const fetchFarmers = async () => {
//     try {
//       const token = sessionStorage.getItem("token");
//       if (!token) {
//         console.error("No token found. Redirecting to login.");
//         return;
//       }

//       const response = await axios.get("https://localhost:7299/api/Farmer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFarmers(response.data);
//     } catch (error) {
//       console.error("Error fetching farmers:", error);
//       if (error.response && error.response.status === 401) {
//         alert("Unauthorized! Please log in again.");
//         sessionStorage.clear();
//         window.location.href = "/Login";
//       }
//     }
//   };

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserRole(user.role); // Set user role (Admin or Shopkeeper)
//     }
//     fetchFarmers();
//   }, []);

//   // Handle "Generate Bill" button click
//   const handleGenerateBill = (farmerId) => {
//     // Navigate to the Bill Generation page for the specific farmer
//     navigate(`/generate-bill/${farmerId}`);
//     Toastify({
//       text: `Bill generation for Farmer ${farmerId} initiated.`,
//       duration: 3000,
//       backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
//       close: true,
//     }).showToast();
//   };

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
//             {userRole === "Shopkeeper" && <th>Action</th>}{" "}
//             {/* Show Action column for Shopkeeper */}
//           </tr>
//         </thead>
//         <tbody>
//           {farmers.length > 0 ? (
//             farmers.map((farmer) => (
//               <tr key={farmer.farmerId}>
//                 <td>{farmer.farmerId}</td>
//                 <td>
//                   {farmer.firstName} {farmer.lastName}
//                 </td>
//                 <td>{farmer.email}</td>
//                 <td>{farmer.contactNo}</td>
//                 {userRole === "Shopkeeper" && (
//                   <td>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleGenerateBill(farmer.farmerId)}
//                     >
//                       Generate Bill
//                     </button>
//                   </td>
//                 )}
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
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function AllFarmer() {
  const [farmers, setFarmers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // Define the toast style for success messages
  const successToastStyle = {
    background: "green",  // Green color for success message
    color: "white",       // Ensure text is readable
  };

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
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }
    fetchFarmers();
  }, []);

  const handleGenerateBill = (farmer) => {
    const shopkeeper = JSON.parse(sessionStorage.getItem("user"));
    navigate(`/generate-bill/${farmer.farmerId}`, {
      state: { farmer, shopkeeper },
    });

    // Show success toast with green background color
    Toastify({
      text: `Bill generation for Farmer ${farmer.farmerId} initiated.`,
      duration: 3000,
      close: true,
      style: successToastStyle,  // Use the defined success style
    }).showToast();
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">All Farmers</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No</th>
            {userRole === "Shopkeeper" && <th>Action</th>}
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
                {userRole === "Shopkeeper" && (
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleGenerateBill(farmer)}
                    >
                      Generate Bill
                    </button>
                  </td>
                )}
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
