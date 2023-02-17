import axios from "axios";

const PROXY = "http://localhost:5000";


// Update instructor profile
const createGuardianStudents = async (newGuardianStudents, token) => {
  const URL = PROXY.concat(
    `/api/guardians/create`
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, newGuardianStudents, config);
  if (response.data) {
    return response.data;
  }
};

// Update Get all guardian students profile and info
const getGuardianStudents = async (token) => {
  const URL = PROXY.concat(
    `/api/guardians/students`
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(URL, config);
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
