import axios from "axios";

const PROXY = "http://localhost:5000";

const API_NEW_LESSON_URL = PROXY.concat("/api/lessons/create");
const API_GET_INSTRUCTOR_LESSONS_URL = PROXY.concat("/api/classes//instructor-classes/:classId/instructor-lessons");
let API_GET_INSTRUCTOR_LESSON_URL = PROXY.concat("/api/classes/instructor-classes/:classId/instructor-lessons/:lessonId");

// post new lesson
const newLesson = async (lessonData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_NEW_LESSON_URL, lessonData, config);
  if (response.data) {
    return response.data;
  }
};

// Get all instructor Class
const getInstructorLessons = async (classId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_GET_INSTRUCTOR_LESSONS_URL}${classId}`, config);
  if (response.data) {
    return response.data;
  }
};

// Get one instructor Class
const getInstructorLesson = async (lessonId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_GET_INSTRUCTOR_LESSON_URL}${lessonId}`, config);
  if (response.data) {
    return response.data;
  }
};

// Put all the function into authService object before exporting
const lessonService = {
  newLesson,
  getInstructorLessons,
  getInstructorLesson,
};

export default lessonService;
