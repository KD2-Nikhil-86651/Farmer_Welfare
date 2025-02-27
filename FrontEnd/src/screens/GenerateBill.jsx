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

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">Generate Bill</h2>
      <div className="card p-4 shadow mt-3">
        {/* Bill Header */}
        <div className="text-center">
          <h3>Ship Malai Trading Co.</h3>
          <p>ทะเบียนงาน: 333300098, ทะเบียนงาน: 44488888, โทรสาร: 344034404</p>
        </div>

        {/* Shopkeeper and Farmer Details */}
        <div className="mt-3">
          <h4>Shopkeeper Details</h4>
          <p>
            <strong>Name:</strong> {shopkeeper.firstName} {shopkeeper.lastName}
          </p>
          <p>
            <strong>Email:</strong> {shopkeeper.email}
          </p>
          <p>
            <strong>Contact No:</strong> {shopkeeper.contactNo}
          </p>

          <h4>Farmer Details</h4>
          <p>
            <strong>Name:</strong> {farmer.firstName} {farmer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {farmer.email}
          </p>
          <p>
            <strong>Contact No:</strong> {farmer.contactNo}
          </p>
        </div>

        {/* Bill Details */}
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Project</th>
              <th>Unit</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>410</td>
              <td>411</td>
              <td>14/02/2025</td>
            </tr>
          </tbody>
        </table>

        {/* Item Details */}
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Item Qty.</th>
              <th>Description of Goods</th>
              <th>Net Weight</th>
              <th>Rate</th>
              <th>Grand Total</th>
              <th>Details</th>
              <th>Inclusive Rs.</th>
              <th>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Item Description</td>
              <td>26.00 kg</td>
              <td>240.00</td>
              <td>624.00</td>
              <td>
                <p>Includes Hamali</p>
                <p>Additional Charges</p>
              </td>
              <td>5.90 Rs.</td>
              <td>50.00 Rs.</td>
            </tr>
          </tbody>
        </table>

        {/* Summary Section */}
        <div className="mt-3">
          <p>
            <strong>Total Rs.:</strong> 624.00
          </p>
          <p>
            <strong>Total Exp.:</strong> 0.00 Rs.
          </p>
          <p>
            <strong>Net Rs.:</strong> 564.00
          </p>
          <p>
            <strong>Balance Rs.:</strong> 564.00
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <p>
            Invoice generated by {shopkeeper.firstName} {shopkeeper.lastName}
          </p>
          <p>Created on: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateBill;
