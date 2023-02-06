import axios from "axios";

const PROXY = "http://localhost:5000";

const API_STUDENT_PROFILE_URL = PROXY.concat("/api/students/create");

// Register user: student profile function (Aysnc)
const UserStudentProfile = async (profileData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_STUDENT_PROFILE_URL,
    profileData,
    config
  );
  if (response.data) {
    return response.data;
  }
};

// Put all the function into authService object before exporting
const studentService = {
  UserStudentProfile,
}

export default studentService;
