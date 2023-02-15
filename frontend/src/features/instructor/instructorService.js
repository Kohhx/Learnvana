import axios from "axios";

const PROXY = "http://localhost:5000";

// instructor routes
const API_INSTRUCTOR_PROFILE_URL = PROXY.concat("/api/instructors/create");
// class routes
const API_NEW_CLASS_URL = PROXY.concat("/api/instructors/classes/create");
const API_GET_INSTRUCTOR_CLASSES_URL = PROXY.concat("/api/instructors/classes");
let API_GET_INSTRUCTOR_CLASS_URL = PROXY.concat("/api/instructors/classes/");

// INSTRUCTOR

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

// CLASSES

// post new class
const newClass = async (classData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_NEW_CLASS_URL, classData, config);
  if (response.data) {
    return response.data;
  }
};

// Get all instructor Class
const getInstructorClasses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_GET_INSTRUCTOR_CLASSES_URL, config);
  if (response.data) {
    return response.data;
  }
};

// Get one instructor Class
const getInstructorClass = async (classId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_GET_INSTRUCTOR_CLASS_URL}${classId}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

// const API_GET_INSTRUCTOR_LESSONS_URL = PROXY.concat(
//   "/api/instructors/classes/:classId/lessons"
// );
// let API_GET_INSTRUCTOR_LESSON_URL = PROXY.concat(
//   "/api/instructors/classes/:classId/lessons/"
// );

// post new lesson
const newLesson = async (lessonData, token) => {
  const { classId } = lessonData;
  const API_NEW_LESSON_URL = PROXY.concat(
    `/api/instructors/classes/${classId}/lessons/create`
  );
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

// Get all instructor Lessons
const getClassLessons = async (classId, token) => {
  const API_GET_INSTRUCTOR_LESSONS_URL = PROXY.concat(
    `/api/instructors/classes/${classId}/lessons`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_GET_INSTRUCTOR_LESSONS_URL, config);
  if (response.data) {
    return response.data;
  }
};

// Get one instructor Lesson
const getClassLesson = async (ids, token) => {
  const { classId, lessonId } = ids;
  const API_GET_INSTRUCTOR_LESSON_URL = PROXY.concat(
    `/api/instructors/classes/${classId}/lessons/${lessonId}`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_GET_INSTRUCTOR_LESSON_URL, config);
  if (response.data) {
    return response.data;
  }
};

// Get one instructor pending students list
const getInstructorClassPendingStudents = async (classId, token) => {
  const URL = PROXY.concat(
    `/api/instructors/classes/${classId}/students/pending`
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

// Get approve student into class
const approveStudentToClass = async (ids, token) => {
  const { classId } = ids;
  const URL = PROXY.concat(
    `/api/instructors/classes/${classId}/students/approve`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, ids, config);
  if (response.data) {
    return response.data;
  }
};

// Get reject student into class
const rejectStudentToClass = async (ids, token) => {
  const { classId } = ids;
  const URL = PROXY.concat(
    `/api/instructors/classes/${classId}/students/reject`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, ids, config);
  if (response.data) {
    return response.data;
  }
};

// Get all students from class
const getStudentsFromClass = async (classId, token) => {
  const URL = PROXY.concat(`/api/instructors/classes/${classId}/students`);
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

// Get reject student into class
const deleteStudentFromClass = async (ids, token) => {
  const { classId } = ids;
  const URL = PROXY.concat(
    `/api/instructors/classes/${classId}/students/delete`
  );
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, ids, config);
  if (response.data) {
    return response.data;
  }
};

// Update instructor profile
const updateInstructorProfile = async (newInstructorProfile, token) => {
  console.log("2")
  const { instructorId } =newInstructorProfile;
  const URL = PROXY.concat(
    `/api/instructors/${instructorId}/update`
  );

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, newInstructorProfile, config);
  if (response.data) {
    return response.data;
  }
};

// Put all the function into authService object before exporting
const instructorService = {
  UserInstructorProfile,
  newClass,
  getInstructorClasses,
  getInstructorClass,
  newLesson,
  getClassLessons,
  getClassLesson,
  getInstructorClassPendingStudents,
  approveStudentToClass,
  rejectStudentToClass,
  getStudentsFromClass,
  deleteStudentFromClass,
  updateInstructorProfile,
};

export default instructorService;
