import axios from "axios";
import { LoginForm, RegisterForm } from "../interfaces/LoginForm";
import { BASE_URL } from "../utils/constant";

export const registerAPI = async (registerValues: RegisterForm) => {
  const { username, email, password } = registerValues;
  const response = await axios.post(
    `${BASE_URL}/users/add`,
    JSON.stringify({
      username,
      email,
      password,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  //console.log("Register Response ", JSON.stringify(response?.data));
  return response?.data;
};

export const loginAPI = async (loginCredentials: LoginForm) => {
  const { username, password } = loginCredentials;

  const response = await axios.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ username: username, password: password }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  //console.log("Response ", JSON.stringify(response?.data));
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BASE_URL}/auth/me`, header);
  //console.log("Profile Response ", JSON.stringify(response?.data));
  return response?.data;
};
