import axios from "axios";
import { LoginForm, RegisterForm } from "../interfaces/LoginForm";
import { LOGIN_URL, PROFILE_URL, USER_URL } from "../utils/constant";

export const registerAPI = async (registerValues: RegisterForm) => {
  const { username, email, password } = registerValues;
  const response = await axios.post(
    USER_URL + "add",
    JSON.stringify({
      username,
      email,
      password,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("Register Response ", JSON.stringify(response?.data));
  return response?.data;
};

export const loginAPI = async (loginCredentials: LoginForm) => {
  const { username, password } = loginCredentials;

  const response = await axios.post(
    LOGIN_URL,
    JSON.stringify({ username: username, password: password }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("Response ", JSON.stringify(response?.data));
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(PROFILE_URL, header);
  console.log("Profile Response ", JSON.stringify(response?.data));
  return response?.data;
};
