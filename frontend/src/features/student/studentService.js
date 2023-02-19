import axios from "axios";

const PROXY = "http://localhost:5000";

const API_STUDENT_PROFILE_URL = PROXY.concat("/api/students/create");
const API_STUDENT_CLASSES_URL = PROXY.concat("/api/students/classes");


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

// Get all students classes
const getStudentClasses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_STUDENT_CLASSES_URL, config);
  if (response.data) {
    return response.data;
  }
};

// Get all students from class
const getStudentsFromClass = async (classId, token) => {
  const URL = PROXY.concat(`/api/students/classes/${classId}/students`);
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

// get all student lessons
const getClassLessons = async (classId, token) => {
  const URL = PROXY.concat(`/api/students/classes/${classId}/lessons`);

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

// Get one student Lesson
const getClassLesson = async (ids, token) => {
  const { classId, lessonId } = ids;
  const URL = PROXY.concat(
    `/api/students/classes/${classId}/lessons/${lessonId}`
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
const studentService = {
  UserStudentProfile,
  getStudentClasses,
  getStudentsFromClass,
  getClassLessons,
  getClassLesson,
}

export default studentService;
