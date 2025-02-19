// import logo from "./logo.svg";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import LoginPage from "./screens/LoginPage";
// import RegisterPage from "./screens/RegisterPage";
// import HomePage from "./screens/HomePage";
// import MarketRates from "./screens/MarketRates";
// import FarmerDetails from "./screens/farmerdetails";
// import Feedback from "./screens/feedback";
// import FarmerDashboard from "./screens/FarmerDashboard";
// import "bootstrap/dist/css/bootstrap.min.css";
// import About from "./screens/About";
// import Shopkeeper from "./screens/Shopkeeper";
// import BuyerDashboard from "./screens/BuyerDashboard";
// import FeedbackDashboard from "./screens/FeedbackDashboard";
// import AdminDashboard from "./screens/AdminDashboard";
// import AllFarmer from "./screens/AllFarmer";
// import AllShopkeepers from "./screens/AllShopkeepers";
// import AllBuyers from "./screens/AllBuyers";

// function App() {
//   return (
//     <div className="container">
//       <Routes>
//         <Route path="Login" element={<LoginPage />}></Route>
//         <Route path="Register" element={<RegisterPage />}></Route>
//         <Route path="HomePage" element={<HomePage />}></Route>
//         <Route path="MarketRates" element={<MarketRates />}></Route>
//         <Route path="Feedback" element={<Feedback />}></Route>
//         <Route path="FarmerDetails" element={<FarmerDetails />}></Route>
//         <Route path="FarmerDashboard" element={<FarmerDashboard />}></Route>
//         <Route path="About" element={<About />}></Route>
//         <Route path="Shopkeeper" element={<Shopkeeper />}></Route>
//         <Route path="BuyerDashboard" element={<BuyerDashboard />}></Route>
//         <Route path="FeedbackDashboard" element={<FeedbackDashboard />}></Route>
//         <Route path="AdminDashboard" element={<AdminDashboard />}></Route>
//         <Route path="AllFarmer" element={<AllFarmer />}></Route>
//         <Route path="AllShopkeepers" element={<AllShopkeepers />}></Route>
//         <Route path="AllBuyers" element={<AllBuyers />}></Route>
//         <Route path="" element={<HomePage />}></Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// Import Screens
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import HomePage from "./screens/HomePage";
import MarketRates from "./screens/MarketRates";
import FarmerDetails from "./screens/farmerdetails";
import Feedback from "./screens/feedback";
import FarmerDashboard from "./screens/FarmerDashboard";
import About from "./screens/About";
import Shopkeeper from "./screens/Shopkeeper";
import BuyerDashboard from "./screens/BuyerDashboard";
import FeedbackDashboard from "./screens/FeedbackDashboard";
import AdminDashboard from "./screens/AdminDashboard";
import AllFarmer from "./screens/AllFarmer";
import AllShopkeepers from "./screens/AllShopkeepers";
import AllBuyers from "./screens/AllBuyers";
import AdminUpdateCrop from "./screens/AdminUpdateCrop"; // ✅ Added Admin Crop Update
import BuyerDetails from "./screens/BuyerDetails";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/MarketRates" element={<MarketRates />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/FarmerDetails" element={<FarmerDetails />} />
        <Route path="/FarmerDashboard" element={<FarmerDashboard />} />
        <Route path="/About" element={<About />} />
        <Route path="/Shopkeeper" element={<Shopkeeper />} />
        <Route path="/BuyerDashboard" element={<BuyerDashboard />} />
        <Route path="/FeedbackDashboard" element={<FeedbackDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AllFarmer" element={<AllFarmer />} />
        <Route path="/AllShopkeepers" element={<AllShopkeepers />} />
        <Route path="/AllBuyers" element={<AllBuyers />} />
        <Route path="/AdminUpdateCrop" element={<AdminUpdateCrop />} />
        <Route path="/BuyerDetails" element={<BuyerDetails />} />
        {/* ✅ Added Route */}
        {/* Default Route - Redirect to HomePage */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
