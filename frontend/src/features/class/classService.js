import { axiosInstance } from "../../config/axios";

const sendRequestToJoinClass = async (ids, token) => {
  const { classId } = ids;
  const URL = `classes/${classId}/request`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(URL, ids, config);
  if (response.data) {
    return response.data;
  }
};

// Put all the function into Service object before exporting
const classService = {
  sendRequestToJoinClass,
};

export default classService;
