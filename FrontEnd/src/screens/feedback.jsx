import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0); // State to track the rating

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if feedback and rating are provided
    if (!feedback || rating === 0) {
      toast.error("Please provide feedback and a rating!");
      return;
    }

    try {
      const response = await fetch("https://localhost:7299/api/Feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback1: feedback }), // Ensure it matches the model property
      });

      if (response.ok) {
        toast.success("Thank you for your feedback!");
        setFeedback("");
        setRating(0);
      } else {
        toast.error("Failed to submit feedback. Try again!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>Feedback</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            required
          />
        </div>

        {/* Stars Section (below the feedback text box) */}
        <div className="d-flex justify-content-center mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: "2rem",
                color: star <= rating ? "#ffc107" : "#e4e5e9", // Gold if selected
                cursor: "pointer",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Submit Button aligned to the right */}
        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {/* Toastify Container for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default Feedback;
