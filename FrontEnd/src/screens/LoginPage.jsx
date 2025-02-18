import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function LoginPage() {
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!contactNo || !password) {
      toast.error("Both fields are required!");
      return false;
    }
    if (!/^\d{10}$/.test(contactNo)) {
      toast.error("Please enter a valid 10-digit mobile number!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://localhost:7299/api/Auth/Login",
          { ContactNo: contactNo, Password: password },
          { headers: { "Content-Type": "application/json" } }
        );

        const data = response.data;
        console.log("✅ Login Response:", data);

        // Save token and user details in sessionStorage
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.user.role);
        sessionStorage.setItem("user", JSON.stringify(data.user)); // Save user details

        toast.success("Login successful!");

        // Redirect based on user role
        if (data.user.role === "Admin") navigate("/AdminDashboard");
        else if (data.user.role === "Farmer") navigate("/FarmerDashboard");
        else if (data.user.role === "Shopkeeper") navigate("/Shopkeeper");
        else if (data.user.role === "Buyer") navigate("/");
        else navigate("/");
      } catch (error) {
        console.error(
          "❌ Login API Error:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data?.message || "Login failed!");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm"
          >
            <div className="mb-3">
              <label htmlFor="contactNo" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contactNo"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
                maxLength="10"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/Register">Register here</Link>
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
