// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function AdminDashboard() {
//   const [admin, setAdmin] = useState({
//     userID: "",
//     firstName: "",
//     lastName: "",
//     contactNo: "",
//     email: "",
//     role: ""
//   });

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       setAdmin(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />
//       <h2 className="mt-4">Admin Dashboard</h2>
//       <div className="card p-4 shadow mt-3">
//         <h3>Admin Details</h3>
//         <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
//         <p><strong>Email:</strong> {admin.email}</p>
//         <p><strong>Contact No:</strong> {admin.contactNo}</p>
//       </div>
//       <div className="mt-3">
//         <Link to="/FeedbackDashboard" className="btn btn-primary">
//           View Feedbacks
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [admin, setAdmin] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">Admin Dashboard</h2>
      <div className="card p-4 shadow mt-3">
        <h3>Admin Details</h3>
        <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Contact No:</strong> {admin.contactNo}</p>
      </div>
      <div className="mt-3">
        <Link to="/FeedbackDashboard" className="btn btn-primary">
          View Feedbacks
        </Link>
      </div>
      <div className="mt-3 d-flex gap-2">
        <Link to="/AllFarmer" className="btn btn-success">
          View Farmers
        </Link>
        <Link to="/AllShopkeepers" className="btn btn-warning">
          View Shopkeepers
        </Link>
        <Link to="/AllBuyers" className="btn btn-info">
          View Buyers
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
