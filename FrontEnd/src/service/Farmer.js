import axios from "axios";
import { createUrl, createError } from "./util";

export async function registerFarmer(farmerData) {
  try {
    const url = createUrl("api/Farmer/Registration");
    console.log("Sending request to:", url, farmerData);

    const response = await axios.post(url, farmerData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response received:", response.data);
    return response.data;
  } catch (ex) {
    console.error("API Error:", ex.response?.data || ex.message);
    return {
      status: "error",
      error: ex.response?.data?.error || "Something went wrong",
    };
  }
}
