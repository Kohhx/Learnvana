import axios from "axios";

const PROXY = "http://localhost:5000"
const API_SIGNUP_URL = PROXY.concat("/api/users/signup");
const API_LOGIN_URL = PROXY.concat("/api/users/login");
const API_INSTRUCTOR_PROFILE_URL = PROXY.concat("/api/instructors/create");
const API_STUDENT_PROFILE_URL = PROXY.concat("/api/students/create");

// Register user function (Aysnc)
const signUp = async (userData) => {
  const response = await axios.post(API_SIGNUP_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};


// Register user: instructor profile function (Aysnc)
const UserInstructorProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_INSTRUCTOR_PROFILE_URL, profileData, config);
  if (response.data) {
    return response.data;
  }
};

// Register user: student profile function (Aysnc)
const UserStudentProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_STUDENT_PROFILE_URL, profileData, config);
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
  console.log("user Removed")
};


// Put all the function into authService object before exporting
const authService = {
  signUp,
  UserInstructorProfile,
  UserStudentProfile,
  login,
  logout,
};

export default authService;
