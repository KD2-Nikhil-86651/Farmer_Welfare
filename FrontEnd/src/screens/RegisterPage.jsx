// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { registerFarmer } from "../service/Farmer";
// import { registerShopkeeper } from "../service/Shopkeeper";
// import { registerBuyer } from "../service/Buyer";

// function RegisterPage() {
//   const [userType, setUserType] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     contactNo: "",
//     licenseNo: "",
//     email: "",
//     dob: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const { firstName, lastName, contactNo, licenseNo, email, dob, password } =
//       formData;

//     if (!firstName || !lastName || !contactNo || !email || !password) {
//       toast.error("Please fill all required fields.");
//       return false;
//     }
//     if (userType === "Shopkeeper" && !licenseNo) {
//       toast.error("License No is required for Shopkeeper.");
//       return false;
//     }
//     if (userType === "Farmer" && !dob) {
//       toast.error("Date of Birth is required for Farmer.");
//       return false;
//     }
//     if (!/^[0-9]{10}$/.test(contactNo)) {
//       toast.error("Invalid Contact Number. It should be 10 digits.");
//       return false;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       toast.error("Invalid Email Address.");
//       return false;
//     }
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long.");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     let result;
//     try {
//       if (userType === "Farmer") {
//         result = await registerFarmer({
//           FirstName: formData.firstName,
//           LastName: formData.lastName,
//           ContactNo: formData.contactNo,
//           Dob: formData.dob,
//           Email: formData.email,
//           Password: formData.password,
//         });
//       } else if (userType === "Shopkeeper") {
//         const shopkeeperData = {
//           FirstName: formData.firstName,
//           LastName: formData.lastName,
//           ContactNo: formData.contactNo,
//           LicenseNo: formData.licenseNo,
//           Email: formData.email,
//           Password: formData.password,
//         };

//         console.log("Registering Shopkeeper with data:", shopkeeperData);
//         result = await registerShopkeeper(shopkeeperData);
//       } else if (userType === "Buyer") {
//         const buyerData = {
//           FirstName: formData.firstName,
//           LastName: formData.lastName,
//           ContactNo: formData.contactNo,
//           Email: formData.email,
//           Password: formData.password,
//           CategoryId: 1, // ✅ Ensure this is included if required
//         };

//         console.log("Registering Buyer with data:", buyerData);
//         result = await registerBuyer(buyerData);
//       } else {
//         toast.error("Please select a valid user type.");
//         return;
//       }

//       // ✅ Moved this block outside the if-else chain
//       if (result.status === "success") {
//         toast.success("Successfully registered the user");
//         navigate("/Login");
//       } else {
//         toast.error(result.error || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Registration Error:", error);
//       toast.error("An error occurred while registering. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <br />
//       <br />

//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "90vh" }}
//       >
//         <div
//           className="container mt-4 p-3 border rounded shadow"
//           style={{ maxWidth: "500px" }}
//         >
//           <h2 className="text-center">Register</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-2">
//               <label className="form-label">User Type</label>
//               <select
//                 className="form-control"
//                 value={userType}
//                 onChange={(e) => setUserType(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Select User Type ▼
//                 </option>
//                 <option value="Shopkeeper">Shopkeeper</option>
//                 <option value="Buyer">Buyer</option>
//                 <option value="Farmer">Farmer</option>
//               </select>
//             </div>

//             <div className="mb-2">
//               <label className="form-label">First Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Last Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Contact No</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="contactNo"
//                 value={formData.contactNo}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {userType === "Shopkeeper" && (
//               <div className="mb-2">
//                 <label className="form-label">License No</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="licenseNo"
//                   value={formData.licenseNo}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}

//             {userType === "Farmer" && (
//               <div className="mb-2">
//                 <label className="form-label">Date of Birth</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   name="dob"
//                   value={formData.dob}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             )}

//             <div className="mb-2">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-2">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100">
//               Register
//             </button>
//             <p className="text-center mt-2">
//               Already have an account? <Link to="/Login">Login here</Link>
//             </p>
//           </form>
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar
//             closeOnClick
//             pauseOnHover
//             draggable
//             theme="colored"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerFarmer } from "../service/Farmer";
import { registerShopkeeper } from "../service/Shopkeeper";
import { registerBuyer } from "../service/Buyer";

function RegisterPage() {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    licenseNo: "",
    email: "",
    dob: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    const { firstName, lastName, contactNo, licenseNo, email, dob, password } =
      formData;

    if (!firstName || !lastName || !contactNo || !email || !password) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (userType === "Shopkeeper" && !licenseNo) {
      toast.error("License No is required for Shopkeeper.");
      return false;
    }
    if (userType === "Farmer" && !dob) {
      toast.error("Date of Birth is required for Farmer.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(contactNo)) {
      toast.error("Invalid Contact Number. It should be 10 digits.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid Email Address.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let result;
    try {
      const formattedDob = formData.dob
        ? new Date(formData.dob).toISOString().split("T")[0]
        : "";

      const requestData = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        ContactNo: formData.contactNo,
        Email: formData.email,
        Password: formData.password,
      };

      if (userType === "Farmer") {
        requestData.Dob = formattedDob;
        // console.log("Registering Farmer with data:", requestData);
        result = await registerFarmer(requestData);
      } else if (userType === "Shopkeeper") {
        requestData.LicenseNo = formData.licenseNo;
        console.log("Registering Shopkeeper with data:", requestData);
        result = await registerShopkeeper(requestData);
      } else if (userType === "Buyer") {
        requestData.CategoryId = 1; // Ensure this field is required if necessary
        console.log("Registering Buyer with data:", requestData);
        result = await registerBuyer(requestData);
      } else {
        toast.error("Please select a valid user type.");
        return;
      }

      // Handle API response
      if (result.status === "success") {
        toast.success("Successfully registered the user");
        navigate("/Login");
      } else {
        toast.error(result.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("An error occurred while registering. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <div
          className="container mt-4 p-3 border rounded shadow"
          style={{ maxWidth: "500px" }}
        >
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">User Type</label>
              <select
                className="form-control"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="" disabled>
                  Select User Type ▼
                </option>
                <option value="Shopkeeper">Shopkeeper</option>
                <option value="Buyer">Buyer</option>
                <option value="Farmer">Farmer</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Contact No</label>
              <input
                type="text"
                className="form-control"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </div>

            {userType === "Shopkeeper" && (
              <div className="mb-2">
                <label className="form-label">License No</label>
                <input
                  type="text"
                  className="form-control"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {userType === "Farmer" && (
              <div className="mb-2">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <p className="text-center mt-2">
              Already have an account? <Link to="/Login">Login here</Link>
            </p>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
