import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const BuyerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stock, setStock] = useState([]);
  const [notifications, setNotifications] = useState([
    "New shipment of organic carrots available!",
    "Auction starting in 1 hour!",
  ]);

  useEffect(() => {
    setStock([
      { name: "Tomatoes", quantity: 500, price: 30, auctionTime: "2:00 PM" },
      { name: "Potatoes", quantity: 1000, price: 25, auctionTime: "3:00 PM" },
      { name: "Wheat", quantity: 800, price: 40, auctionTime: "4:00 PM" },
    ]);
    setOrders([
      {
        id: "1201",
        produce: "Tomatoes",
        quantity: 300,
        status: "Pending",
        deliveryDate: "31st Jan",
      },
      {
        id: "1202",
        produce: "Wheat",
        quantity: 400,
        status: "Delivered",
        deliveryDate: "28th Jan",
      },
    ]);
    setPayments([
      {
        invoice: "INV12345",
        amount: "₹5000",
        status: "Completed",
        date: "28th Jan",
      },
      {
        invoice: "INV12346",
        amount: "₹2000",
        status: "Pending",
        date: "29th Jan",
      },
    ]);
  }, []);

  const notify = (message) => {
    toast.info(message);
  };

  return (
    <div className="container-fluid">
      <ToastContainer />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-dark text-white p-3">
        <div className="logo">[Logo]</div>

        {/* Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id="dropdown-basic"
            className="p-0 border-0"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="profile-img"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/edit-profile">Edit Profile</Dropdown.Item>
            <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-light p-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Inventory
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Payments
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Order History
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Notifications
              </a>
            </li>
          </ul>
        </div>

        {/* Dashboard Main Content */}
        <div className="col-md-9 p-3">
          <h2>Welcome, Buyer!</h2>

          {/* Stock Overview */}
          <div className="mb-4">
            <h3>Stock Overview</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Produce Name</th>
                  <th>Quantity</th>
                  <th>Price (per kg)</th>
                  <th>Auction Time</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.quantity} kg</td>
                    <td>{item.price}</td>
                    <td>{item.auctionTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Current Orders */}
          <div className="mb-4">
            <h3>Current Orders</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Produce</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Delivery Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.produce}</td>
                    <td>{order.quantity} kg</td>
                    <td>{order.status}</td>
                    <td>{order.deliveryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Payments */}
          <div className="mb-4">
            <h3>Recent Payments</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Amount Paid</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.invoice}>
                    <td>{payment.invoice}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.status}</td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notifications */}
          <div className="mb-4">
            <h3>Notifications</h3>
            <ul className="list-group">
              {notifications.map((notification, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => notify(notification)}
                  style={{ cursor: "pointer" }}
                >
                  {notification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
