import axios from "axios";

const PROXY = "http://localhost:5000"
const API_SIGNUP_URL = PROXY.concat("/api/users/signup");
const API_LOGIN_URL = PROXY.concat("/api/users/login");

// Register user function (Aysnc)
const signUp = async (userData) => {
  const response = await axios.post(API_SIGNUP_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_LOGIN_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
  console.log("user Removed")
};

// Put all the function into authService object before exporting
const authService = {
  signUp,
  login,
  logout
};

export default authService;
