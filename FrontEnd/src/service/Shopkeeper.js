// import axios from "axios";
// import { createUrl } from "./util"; // Ensure createUrl is correctly implemented

// export async function registerShopkeeper(
//   FirstName,
//   LastName,
//   ContactNo,
//   LicenseNo,
//   Email,
//   Password
// ) {
//   try {
//     // ✅ Ensure required fields are not empty before sending request
//     if (!FirstName || !LastName || !ContactNo || !LicenseNo || !Email || !Password) {
//       return { status: "error", error: "All fields are required." };
//     }

//     // ✅ Validate contact number length (Must be 10 digits)
//     if (ContactNo.length !== 10) {
//       return { status: "error", error: "Contact number must be 10 digits long." };
//     }

//     // ✅ Validate password length (At least 6 characters)
//     if (Password.length < 6) {
//       return { status: "error", error: "Password must be at least 6 characters long." };
//     }

//     const url = createUrl("api/Shopkeeper/Registration");
//     const body = { FirstName, LastName, ContactNo, LicenseNo, Email, Password };

//     console.log("Sending request to:", url, body); // Debugging

//     const response = await axios.post(url, body);

//     console.log("Response received:", response.data); // Debugging response

//     return response.data; // Ensure backend returns JSON with "status"
//   } catch (ex) {
//     console.error("API Error:", ex.response?.data || ex.message);

//     return {
//       status: "error",
//       error: ex.response?.data?.error || "Something went wrong. Please try again.",
//     };
//   }
// }

import axios from "axios";
import { createUrl } from "./util";

export async function registerShopkeeper(shopkeeperData) {
  try {
    // ✅ Validate fields before sending request
    if (
      !shopkeeperData.FirstName ||
      !shopkeeperData.LastName ||
      !shopkeeperData.ContactNo ||
      !shopkeeperData.LicenseNo ||
      !shopkeeperData.Email ||
      !shopkeeperData.Password
    ) {
      return { status: "error", error: "All fields are required." };
    }

    if (shopkeeperData.ContactNo.length !== 10) {
      return {
        status: "error",
        error: "Contact number must be 10 digits long.",
      };
    }

    if (shopkeeperData.Password.length < 6) {
      return {
        status: "error",
        error: "Password must be at least 6 characters long.",
      };
    }

    const url = createUrl("api/Shopkeeper/Registration");
    console.log("Sending request to:", url, shopkeeperData); // Debugging

    const response = await axios.post(url, shopkeeperData);

    console.log("Response received:", response.data); // Debugging response

    return response.data;
  } catch (ex) {
    console.error("API Error:", ex.response?.data || ex.message);
    return {
      status: "error",
      error:
        ex.response?.data?.error || "Something went wrong. Please try again.",
    };
  }
}
