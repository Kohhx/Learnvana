import axios from "axios";

const PROXY = "http://localhost:5000";

const API_INSTRUCTOR_PROFILE_URL = PROXY.concat("/api/instructors/create");

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

// Put all the function into authService object before exporting
const instructorService = {
  UserInstructorProfile,
}

export default instructorService;
