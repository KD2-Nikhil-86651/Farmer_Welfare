// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// function FeedbackDashboard() {
//   const [feedbackList, setFeedbackList] = useState([]);

//   // Fetch feedback from the backend
//   const fetchFeedback = async () => {
//     try {
//       const response = await fetch("https://localhost:7299/api/Feedback");
//       if (response.ok) {
//         const data = await response.json();
//         setFeedbackList(data);
//       } else {
//         console.error("Failed to fetch feedback");
//       }
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFeedback(); // Fetch feedback on component mount
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />
//       <h2 className="mt-4">Feedback Dashboard</h2>
//       <table className="table table-bordered mt-3">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Feedback</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feedbackList.length > 0 ? (
//             feedbackList.map((item) => (
//               <tr key={item.feedbackId}>
//                 <td>{item.feedbackId}</td>
//                 <td>{item.feedback1}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2" className="text-center">
//                 No feedback available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default FeedbackDashboard;
//*********************************************************************************************************** */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function FeedbackDashboard() {
  const [feedbackList, setFeedbackList] = useState([]);

  // Fetch feedback from the backend
  const fetchFeedback = async () => {
    try {
      const response = await fetch("https://localhost:7299/api/Feedback");
      if (response.ok) {
        const data = await response.json();
        setFeedbackList(data);
      } else {
        console.error("Failed to fetch feedback");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7299/api/Feedback/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setFeedbackList(feedbackList.filter((item) => item.feedbackId !== id));
      } else {
        console.error("Failed to delete feedback");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  useEffect(() => {
    fetchFeedback(); // Fetch feedback on component mount
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4">Feedback Dashboard</h2>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length > 0 ? (
            feedbackList.map((item) => (
              <tr key={item.feedbackId}>
                <td>{item.feedbackId}</td>
                <td>{item.feedback1}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFeedback(item.feedbackId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No feedback available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackDashboard;
//************************************************************************************************************* */
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";

// function FeedbackDashboard() {
//   const [feedbackList, setFeedbackList] = useState([]);

//   // Fetch feedback from the backend
//   const fetchFeedback = async () => {
//     try {
//       const response = await fetch("https://localhost:7299/api/Feedback");
//       if (response.ok) {
//         const data = await response.json();
//         setFeedbackList(data);
//       } else {
//         console.error("Failed to fetch feedback");
//       }
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   // Delete feedback with admin token
//   const deleteFeedback = async (id) => {
//     try {
//       const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

//       if (!token) {
//         console.error("🚨 Unauthorized: Admin token is missing.");
//         return;
//       }

//       console.log("🔹 Sending Delete Request with Token:", token);

//       const response = await fetch(`https://localhost:7299/api/Feedback/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`, // Send token in Authorization header
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         setFeedbackList(feedbackList.filter((item) => item.feedbackId !== id));
//         console.log("✅ Feedback deleted successfully");
//       } else {
//         const errorData = await response.json();
//         console.error("🚨 Failed to delete feedback:", errorData);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting feedback:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFeedback(); // Fetch feedback on component mount
//   }, []);

//   return (
//     <div className="container">
//       <Navbar />
//       <h2 className="mt-4">Feedback Dashboard</h2>
//       <table className="table table-bordered mt-3">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Feedback</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feedbackList.length > 0 ? (
//             feedbackList.map((item) => (
//               <tr key={item.feedbackId}>
//                 <td>{item.feedbackId}</td>
//                 <td>{item.feedback1}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => deleteFeedback(item.feedbackId)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center">
//                 No feedback available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default FeedbackDashboard;

