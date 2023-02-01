import axios from "axios";

const API_SIGNUP_URL = "/api/users/signup";
const API_LOGIN_URL = "/api/users/login";

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
