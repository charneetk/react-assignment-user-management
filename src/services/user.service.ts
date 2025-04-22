import axios from "axios";
import { USER_URL } from "../utils/constant";

export const getUserData = async () => {
  const token = JSON.parse(`${localStorage.getItem("token")}`);
  console.log("tok ", token);
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(USER_URL, header);
  console.log("User Response ", JSON.stringify(response?.data));
  return response?.data?.users;
};
