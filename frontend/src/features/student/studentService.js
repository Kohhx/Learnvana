import { axiosInstance } from "../../config/axios";

// Register user: student profile function (Aysnc)
const UserStudentProfile = async (profileData, token) => {
  const URL = "students/create";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.get(URL, profileData, config);
  if (response.data) {
    return response.data;
  }
};

// Get all students classes
const getStudentClasses = async (studentId, token) => {
  const URL = `students/${studentId}/classes`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axiosInstance.get(URL, config);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// Get all students from class
const getStudentsFromClass = async (ids, token) => {
  const { studentId, classId } = ids;
  const URL = `students/${studentId}/classes/${classId}/students`;
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

// get all student lessons
const getClassLessons = async (classId, token) => {
  const URL = `students/classes/${classId}/lessons`;

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

// Get one student Lesson
const getClassLesson = async (ids, token) => {
  const { classId, lessonId } = ids;
  const URL = `students/classes/${classId}/lessons/${lessonId}`;
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
const studentService = {
  UserStudentProfile,
  getStudentClasses,
  getStudentsFromClass,
  getClassLessons,
  getClassLesson,
};

export default studentService;
