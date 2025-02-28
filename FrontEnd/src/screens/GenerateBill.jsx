import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios"; // Import axios

const GenerateBill = () => {
  const location = useLocation();
  const { farmer, shopkeeper } = location.state || {};
  const [crops, setCrops] = useState([]);
  const [calcStripNo, setCalcStripNo] = useState("");
  const [selectedCropRate, setSelectedCropRate] = useState(""); // State to store selected crop rate
  const [netWeight, setNetWeight] = useState(""); // State to store the net weight
  const [totalAmount, setTotalAmount] = useState(""); // State to store the total amount
  const [qty, setQty] = useState(1); // Track the qty input
  const [lessExpense, setLessExpense] = useState(0); // Track the total less expense
  const [balance, setBalance] = useState(0); // Track the balance
  const billRef = useRef(null);

  useEffect(() => {
    const sequenceId = Date.now();
    setCalcStripNo(sequenceId);

    // Fetch crops from the API
    const fetchCrops = async () => {
      try {
        const response = await axios.get("https://localhost:7299/api/Crops");
        if (response.data && response.data.data) {
          setCrops(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching crops:", err);
      }
    };
    fetchCrops();
  }, []);

  // If no farmer or shopkeeper is found, return an error
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

  // Handle change in crop selection
  const handleCropChange = (e) => {
    const selectedCropName = e.target.value;
    const selectedCrop = crops.find(
      (crop) => crop.cropName === selectedCropName
    );
    if (selectedCrop) {
      setSelectedCropRate(selectedCrop.rate); // Update the rate for the selected crop
    }
  };

  // Handle change in net weight and calculate the total
  const handleNetWeightChange = (e) => {
    const weight = e.target.value;
    setNetWeight(weight);

    // Calculate total based on weight and per 10kg rate
    if (selectedCropRate && weight) {
      const total = (weight / 10) * selectedCropRate; // Total = (Weight / 10) * rate per 10kg
      setTotalAmount(total.toFixed(2)); // Set the total amount with 2 decimal points
    } else {
      setTotalAmount(""); // Clear total if no weight or rate is selected
    }
  };

  // Handle qty change and update expenses
  const handleQtyChange = (e) => {
    const quantity = e.target.value;
    setQty(quantity);

    // Calculate expenses based on quantity
    const hamali = (5.9 * quantity).toFixed(2);
    const borai = (2.21 * quantity).toFixed(2);
    const tolai = (1.43 * quantity).toFixed(2);
    const mapai = (0.0 * quantity).toFixed(2); // No change for Mapai
    const motorFare = (50 * quantity).toFixed(2);

    const totalExpense =
      parseFloat(hamali) +
      parseFloat(borai) +
      parseFloat(tolai) +
      parseFloat(mapai) +
      parseFloat(motorFare);
    setLessExpense(totalExpense.toFixed(2)); // Update less expense

    // Update balance after deducting less expenses from total amount
    if (totalAmount) {
      const newBalance = (parseFloat(totalAmount) - totalExpense).toFixed(2);
      setBalance(newBalance);
    }
  };

  const handlePrint = () => {
    window.print(); // Prints the whole page
  };

  const handleSend = () => {
    alert("Send functionality coming soon!"); // Placeholder for send functionality
  };

  // Handle Save functionality
  const handleSave = async () => {
    const billData = {
      farmerName: `${farmer.firstName} ${farmer.lastName}`,
      shopName: shopName,
      cropName: selectedCropRate,
      netWeight,
      totalAmount,
      lessExpense,
      balance,
      transport: document.querySelector('input[placeholder="Enter transporter name"]').value, // Fetch transport name
      qty,
      calcStripNo,
      date: new Date().toLocaleDateString(),
    };

    try {
      const response = await axios.post("https://localhost:7299/api/Bills", billData); // Your save endpoint
      if (response.status === 200) {
        alert("Bill saved successfully!");
      }
    } catch (error) {
      console.error("Error saving bill:", error);
      alert("Failed to save the bill.");
    }
  };

  return (
    <div className="container p-4" ref={billRef}>
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
          {shopkeeper.contactNo} | Email: {shopkeeper.email}
        </p>
      </div>

      <div
        className="d-flex justify-content-between mt-4 p-3"
        style={{ border: "1px solid black" }}
      >
        <div>
          <p>Shop No.</p>
          <input
            type="number"
            className="form-control"
            style={{ width: "120px", border: "1px solid black" }}
          />
        </div>
        <div>
          <p>Calculation Strip No: ({calcStripNo})</p>
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
              style={{ border: "1px solid black" }}
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
                type="number"
                className="form-control"
                value={qty} // Bind qty value
                onChange={handleQtyChange} // Handle qty change
                style={{ border: "1px solid black" }}
              />
            </td>
            <td>
              {/* Dropdown for selecting crop */}
              <select
                className="form-control"
                style={{ border: "1px solid black" }}
                onChange={handleCropChange} // Handle crop selection
              >
                <option value="">Select Crop</option>
                {crops.map((crop) => (
                  <option key={crop.cropId} value={crop.cropName}>
                    {crop.cropName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Enter weight"
                style={{ border: "1px solid black" }}
                value={netWeight} // Bind weight value
                onChange={handleNetWeightChange} // Handle weight change
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={selectedCropRate} // Bind rate to the selected crop
                style={{ border: "1px solid black" }}
                readOnly // Make it read-only to avoid manual edits
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={totalAmount} // Bind total amount
                style={{ border: "1px solid black" }}
                readOnly // Make it read-only to avoid manual edits
              />
            </td>
            <td>
              <p>Hamali</p>
              <p>Borai</p>
              <p>Tolai</p>
              <p>Mapai</p>
              <p>Motor fare</p>
            </td>
            <td>
              <input
                type="text"
                className="form-control mb-2"
                value={(5.9 * qty).toFixed(2)} // Hamali expense
                style={{ border: "1px solid black" }}
                readOnly
              />
              <input
                type="text"
                className="form-control mb-2"
                value={(2.21 * qty).toFixed(2)} // Borai expense
                style={{ border: "1px solid black" }}
                readOnly
              />
              <input
                type="text"
                className="form-control mb-2"
                value={(1.43 * qty).toFixed(2)} // Tolai expense
                style={{ border: "1px solid black" }}
                readOnly
              />
              <input
                type="text"
                className="form-control mb-2"
                value={(0.0 * qty).toFixed(2)} // Mapai expense (no change)
                style={{ border: "1px solid black" }}
                readOnly
              />
              <input
                type="text"
                className="form-control mb-2"
                value={(50 * qty).toFixed(2)} // Motor fare expense
                style={{ border: "1px solid black" }}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td colSpan="3"></td>
            <td>
              <p>
                Total RS.:{" "}
                <input
                  type="text"
                  className="form-control"
                  value={totalAmount} // Display total here
                  style={{ border: "1px solid black" }}
                  readOnly
                />
              </p>
              <p>
                Less Expense:{" "}
                <input
                  type="text"
                  className="form-control"
                  value={lessExpense} // Display less expense here
                  style={{ border: "1px solid black" }}
                  readOnly
                />
              </p>
              <p>
                Balance:{" "}
                <input
                  type="text"
                  className="form-control"
                  value={balance} // Display balance here
                  style={{ border: "1px solid black" }}
                  readOnly
                />
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

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
        <button className="btn btn-secondary" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default GenerateBill;
