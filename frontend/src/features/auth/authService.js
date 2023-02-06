import axios from "axios";

const PROXY = "http://localhost:5000";
const API_SIGNUP_URL = PROXY.concat("/api/users/signup");
const API_LOGIN_URL = PROXY.concat("/api/users/login");
const API_INSTRUCTOR_PROFILE_URL = PROXY.concat("/api/instructors/create");

// Register user function (Aysnc)
// No need try catch if it is an error, response.data carries the error
const signUp = async (userData) => {
  const response = await axios.post(API_SIGNUP_URL, userData);
  console.log("response: ", response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  // await pause(10000)
  return response.data;
};

// Register user: instructor profile function (Aysnc)
const UserInstructorProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_INSTRUCTOR_PROFILE_URL,
    profileData,
    config
  );
  if (response.data) {
    return response.data;
  }
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
  console.log("user Removed");
};

// Put all the function into authService object before exporting
const authService = {
  signUp,
  UserInstructorProfile,
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
