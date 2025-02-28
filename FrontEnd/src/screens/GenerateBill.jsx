import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const GenerateBill = () => {
  const location = useLocation();
  const { farmer, shopkeeper } = location.state || {};

  if (!farmer || !shopkeeper) {
    return (
      <div className="container">
        <Navbar />
        <h2 className="mt-4">Error: No farmer or shopkeeper data found.</h2>
      </div>
    );
  }

  const shopName = shopkeeper.lastName ? `Shri ${shopkeeper.lastName} Trading Co.` : "Default Trading Co.";

  return (
    <div className="container border p-4">
      <Navbar />
      <div className="text-center">
        <h5><strong>Agriculture Produce Market Committee</strong></h5>
        <h3>{shopName}</h3>
        <p>Onion, Potato, Garlic & Vegetables dealers</p>
        <p>Shri Chhatrapati Shivaji Market Yard, Pune - 411037</p>
        <p>PROP: {shopkeeper.firstName} {shopkeeper.lastName} | Mobile: {shopkeeper.contactNo}</p>
      </div>

      <div className="d-flex justify-content-between mt-4 border p-2">
        <div>
          <p>Shop No.</p>
          <div className="border p-2" style={{ width: "100px", height: "50px" }}></div>
        </div>
        <div>
          <p>Calculation Strip No: (bill id)</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <p>Name of the Farmer: {farmer.firstName} {farmer.lastName}</p>
          <p>Transport: (Enter Name here)</p>
        </div>
      </div>

      <table className="table table-bordered mt-3 text-center">
        <thead>
          <tr>
            <th>Qty</th>
            <th>Types of goods</th>
            <th>Net Weight</th>
            <th>Per 10KG Rate</th>
            <th>Total</th>
            <th>Details of Expense</th>
            <th>Money RS.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" placeholder="Enter qty" /></td>
            <td><input type="text" placeholder="Enter goods" /></td>
            <td><input type="text" placeholder="Enter weight" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td>
              <p>Hamali</p>
              <p>Borai</p>
              <p>Tolai</p>
              <p>Mapai</p>
              <p>Motor fare</p>
            </td>
            <td>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan="3"></td>
            <td>
              <p>Total RS.: <input type="text" /></p>
              <p>Less Expense: <input type="text" /></p>
              <p>Balance: <input type="text" /></p>
            </td>
            <td colSpan="3"></td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <p>Yours Truly: {shopkeeper.firstName} {shopkeeper.lastName}</p>
      </div>

      <div className="text-center mt-4">
        <p>Cash Received</p>
      </div>
    </div>
  );
};

export default GenerateBill;

