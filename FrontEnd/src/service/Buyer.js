// import axios from "axios";
// import { createUrl, createError } from "./util";

// export async function registerBuyer(
//   FirstName,
//   LastName,
//   ContactNo,
//   Email,
//   Password
// ) {
//   try {
//     const url = createUrl("api/Buyer/Registration");
//     const body = { FirstName, LastName, ContactNo, Email, Password };
//     console.log("Sending request to:", url, body);

//     const response = await axios.post(url, body);
//     console.log("Response received:", response.data); // Debugging

//     return response.data; // Ensure backend is returning JSON with "status"
//   } catch (ex) {
//     console.error("API Error:", ex.response?.data || ex.message);
//     return {
//       status: "error",
//       error: ex.response?.data?.error || "Something went wrong",
//     };
//   }
// }



import axios from "axios";
import { createUrl } from "./util"; // Ensure createUrl is implemented correctly

export async function registerBuyer({ FirstName, LastName, ContactNo, Email, Password }) {
  try {
    // ✅ Ensure required fields are provided
    if (!FirstName || !LastName || !ContactNo || !Email || !Password) {
      return { status: "error", error: "All fields are required." };
    }

    // ✅ Ensure the contact number is exactly 10 digits
    if (!/^\d{10}$/.test(ContactNo)) {
      return { status: "error", error: "Contact number must be 10 digits long." };
    }

    // ✅ Ensure the password is at least 6 characters long
    if (Password.length < 6) {
      return { status: "error", error: "Password must be at least 6 characters long." };
    }

    const url = createUrl("api/Buyer/Registration");

    // ✅ Add `CategoryId` if required by the API
    const body = {
      FirstName,
      LastName,
      ContactNo,
      Email,
      Password,
      CategoryId: 1, // Set default CategoryId (adjust if necessary)
    };

    console.log("Sending request to:", url, body); // Debugging

    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" }, // ✅ Ensure correct headers
    });

    console.log("Response received:", response.data); // Debugging

    return response.data;
  } catch (ex) {
    console.error("API Error:", ex.response?.data || ex.message);
    return {
      status: "error",
      error: ex.response?.data?.error || "Something went wrong. Please try again.",
    };
  }
}
