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
        <hr style={{ border: "2px solid black" }} />
        <h3>{shopName}</h3>
        <p>Onion, Potato, Garlic & Vegetables dealers</p>
        <p>Shri Chhatrapati Shivaji Market Yard, Pune - 411037</p>
        <p>PROP: {shopkeeper.firstName} {shopkeeper.lastName} | Mobile: {shopkeeper.contactNo}</p>
      </div>

      <div className="d-flex justify-content-between mt-4 border p-2">
        <div>
          <p>Shop No.</p>
          <input type="number" className="border p-2" style={{ width: "100px" }} />
        </div>
        <div>
          <p>Calculation Strip No: (bill id)</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <p>Name of the Farmer: {farmer.firstName} {farmer.lastName}</p>
          <p>Transport: <input type="text" placeholder="Enter transport name" /></p>
        </div>
      </div>

      <table className="table table-bordered mt-3 text-center" style={{ border: "3px solid black" }}>
        <thead style={{ border: "3px solid black" }}>
          <tr style={{ border: "3px solid black" }}>
            <th style={{ border: "3px solid black" }}>Qty</th>
            <th style={{ border: "3px solid black" }}>Types of goods</th>
            <th style={{ border: "3px solid black" }}>Net Weight</th>
            <th style={{ border: "3px solid black" }}>Per 10KG Rate</th>
            <th style={{ border: "3px solid black" }}>Total</th>
            <th style={{ border: "3px solid black" }}>Details of Expense</th>
            <th style={{ border: "3px solid black" }}>Money RS.</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ border: "3px solid black" }}>
            <td style={{ border: "3px solid black" }}><input type="text" placeholder="Enter qty" /></td>
            <td style={{ border: "3px solid black" }}><input type="text" placeholder="Enter goods" /></td>
            <td style={{ border: "3px solid black" }}><input type="text" placeholder="Enter weight" /></td>
            <td style={{ border: "3px solid black" }}><input type="text" /></td>
            <td style={{ border: "3px solid black" }}><input type="text" /></td>
            <td style={{ border: "3px solid black" }}>
              <p>Hamali</p>
              <p>Borai</p>
              <p>Tolai</p>
              <p>Mapai</p>
              <p>Motor fare</p>
            </td>
            <td style={{ border: "3px solid black" }}>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </td>
          </tr>
          <tr style={{ border: "3px solid black" }}>
            <td colSpan="3"></td>
            <td style={{ border: "3px solid black" }}>
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
