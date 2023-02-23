import { axiosInstance } from "../../config/axios";

const signUp = async (userData) => {
  const URL = "users/signup"
  const response = await axiosInstance.post(URL, userData);
  console.log("response: ", response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  // await pause(10000)
  return response.data;
};

// login user
const login = async (userData) => {
  const URL = "users/login"
  const response = await axiosInstance.post(URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
  console.log("user Removed");
};

// Put all the function into authService object before exporting
const authService = {
  signUp,
  login,
  logout,
};

// DEV ONLY - pause loading to see loading state spinner!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export default authService;
