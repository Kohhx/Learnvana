import { axiosInstance } from "../../config/axios";

// Update instructor profile
const createGuardianStudents = async (newGuardianStudents, token) => {
  const URL = "guardians/create";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(URL, newGuardianStudents, config);
  if (response.data) {
    return response.data;
  }
};

// Update Get all guardian students profile and info
const getGuardianStudents = async (token) => {
  const URL = "guardians/students";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(URL, config);
  if (response.data) {
    return response.data;
  }
};

// Put all the function into authService object before exporting
const guardianService = {
  createGuardianStudents,
  getGuardianStudents,
};

export default guardianService;
