import { axiosInstance } from "../../config/axios";
import formatUtil from "../../utilities/FormatUtil";

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

// Update instructor profile
const updateUserProfile = async (newUserProfile, token) => {
  console.log("2")

  const newUserProfileFD =
    formatUtil.convertObjToFormData(newUserProfile);

  console.log("FormData OUt", newUserProfileFD.get("avatar"));
  const URL = `users/update`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.post(
    URL,
    newUserProfileFD,
    config
  );
  if (response.data) {
    return response.data;
  }
};

// Put all the function into authService object before exporting
const authService = {
  signUp,
  login,
  logout,
  updateUserProfile,
};

// DEV ONLY - pause loading to see loading state spinner!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export default authService;
