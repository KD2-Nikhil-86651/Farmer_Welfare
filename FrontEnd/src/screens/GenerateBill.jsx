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
        <br />
        <br />
        <br />
        <h2 className="mt-4">Error: No farmer or shopkeeper data found.</h2>
      </div>
    );
  }

  const shopName = shopkeeper.lastName
    ? `Shri ${shopkeeper.lastName} Trading Co.`
    : "Default Trading Co.";

  return (
    <div className="container p-4">
      <Navbar />
      <br />
      <br />
      <br />
      <div className="text-center">
        <h5>
          <strong>Agriculture Produce Market Committee</strong>
        </h5>
        <hr style={{ border: "1px solid red" }} />
        <h3 style={{ fontSize: "32px", fontWeight: "bold" }}>{shopName}</h3>
        <p>Onion, Potato, Garlic & Vegetables dealers</p>
        <p>Shri Chhatrapati Shivaji Market Yard, Pune - 411037</p>
        <p className="fw-bold" style={{ fontSize: "18px" }}>
          PROP: {shopkeeper.firstName} {shopkeeper.lastName} | Mobile:{" "}
          {shopkeeper.contactNo}| Email: {shopkeeper.email}
        </p>
      </div>

      {/* <div className="d-flex justify-content-between mt-4 border p-3"> */}
      <div
        className="d-flex justify-content-between mt-4 p-3"
        style={{ border: "1px solid black" }}
      >
        <div>
          <p>Shop No.</p>
          <input
            type="number"
            className="form-control"
            style={{ width: "120px" }}
          />
        </div>
        <div>
          <p>Calculation Strip No: (bill id)</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <p>
            Name of the Farmer: {farmer.firstName} {farmer.lastName}
          </p>
          <p>
            Transport:{" "}
            <input
              type="text"
              className="form-control"
              placeholder="Enter transporter name"
            />
          </p>
        </div>
      </div>

      <table
        className="table table-bordered mt-3 text-center"
        style={{ border: "2px solid black" }}
      >
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
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter qty"
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter goods"
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter weight"
              />
            </td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <p>Hamali</p>
              <p>Borai</p>
              <p>Tolai</p>
              <p>Mapai</p>
              <p>Motor fare</p>
            </td>
            <td>
              <input type="text" className="form-control mb-2" />
              <input type="text" className="form-control mb-2" />
              <input type="text" className="form-control mb-2" />
              <input type="text" className="form-control mb-2" />
              <input type="text" className="form-control mb-2" />
            </td>
          </tr>
          <tr>
            <td colSpan="3"></td>
            <td>
              <p>
                Total RS.: <input type="text" className="form-control" />
              </p>
              <p>
                Less Expense: <input type="text" className="form-control" />
              </p>
              <p>
                Balance: <input type="text" className="form-control" />
              </p>
            </td>
            <td colSpan="2"></td>
            <td>
              <p>
                Yours Truly: {shopkeeper.firstName} {shopkeeper.lastName}
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <p style={{ textAlign: "center" }}>Cash Received</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GenerateBill;
