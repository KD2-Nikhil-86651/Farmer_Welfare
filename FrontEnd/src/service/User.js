import axios from "axios";
import { createUrl, createError } from "./util";
export async function registerFarmer(
  FirstName,
  LastName,
  ContactNo,
  DOB,
  Email,
  Password
) {
  try {
    const url = createUrl("api/Farmer/Registration");
    const body = { FirstName, LastName, ContactNo, DOB, Email, Password };
    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    return createError(ex);
  }
}
