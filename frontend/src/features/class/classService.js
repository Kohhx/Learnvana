import axios from "axios";

const PROXY = "http://localhost:5000";

// const API_NEW_CLASS_URL = PROXY.concat("/api/classes/create");
// const API_GET_INSTRUCTOR_CLASSES_URL = PROXY.concat("/api/classes/instructor-classes");
// let API_GET_INSTRUCTOR_CLASS_URL = PROXY.concat("/api/classes/instructor-classes/");

// // post new class
// const newClass = async (classData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.post(API_NEW_CLASS_URL, classData, config);
//   if (response.data) {
//     return response.data;
//   }
// };

// // Get all instructor Class
// const getInstructorClasses = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(API_GET_INSTRUCTOR_CLASSES_URL, config);
//   if (response.data) {
//     return response.data;
//   }
// };

// // Get one instructor Class
// const getInstructorClass = async (classId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(`${API_GET_INSTRUCTOR_CLASS_URL}${classId}`, config);
//   if (response.data) {
//     return response.data;
//   }
// };

// Send request to join a class

const sendRequestToJoinClass = async (ids, token) => {
  const { classId } = ids;
  const API_STUDENT_REQUEST_JOIN_CLASS = PROXY.concat(
    `/api/classes/${classId}/request`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_STUDENT_REQUEST_JOIN_CLASS,
    ids,
    config
  );
  if (response.data) {
    return response.data;
  }
};

// Put all the function into authService object before exporting
const classService = {
  sendRequestToJoinClass,
};

export default classService;
