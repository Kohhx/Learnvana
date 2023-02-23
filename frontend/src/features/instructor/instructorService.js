import { axiosInstance } from "../../config/axios";
import formatUtil from "../../utilities/FormatUtil";

/**
 * =============================================================================
 * Instructor
 * =============================================================================
 */

// Register user: instructor profile function (Aysnc)
const UserInstructorProfile = async (profileData, token) => {
  const URL = "instructors/create";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.post(URL, profileData, config);
  if (response.data) {
    return response.data;
  }
};

// Update instructor profile
const updateInstructorProfile = async (newInstructorProfile, token) => {
  const { instructorId } = newInstructorProfile;

  const newInstructorProfileFD =
    formatUtil.convertObjToFormData(newInstructorProfile);

  console.log("FormData OUt", newInstructorProfileFD.get("avatar"));
  const URL = `instructors/${instructorId}/update`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axiosInstance.post(
    URL,
    newInstructorProfileFD,
    config
  );
  if (response.data) {
    return response.data;
  }
};

/**
 * =============================================================================
 * Instructor Classes
 * =============================================================================
 */

// post new class
const newClass = async (classData, token) => {
  const URL = "instructors/classes/create";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.post(URL, classData, config);
  if (response.data) {
    return response.data;
  }
};

// Get all instructor Class
const getInstructorClasses = async (token) => {
  const URL = "instructors/classes";
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

// Get one instructor Class
const getInstructorClass = async (classId, token) => {
  const URL = `instructors/classes/${classId}`;
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

// Delete Class
const deleteInstructorClass = async (data, token) => {
  const URL = "instructors/classes/delete";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(URL, data, config);
  if (response.data) {
    return response.data;
  }
};

/**
 * =============================================================================
 * Instructor Lessons
 * =============================================================================
 */

// post new lesson
const newLesson = async (lessonData, token) => {
  const { classId } = lessonData;
  const URL = `instructors/classes/${classId}/lessons/create`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.post(URL, lessonData, config);
  if (response.data) {
    return response.data;
  }
};

// Get all instructor Lessons
const getClassLessons = async (classId, token) => {
  const URL = `instructors/classes/${classId}/lessons`;

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

// Get one instructor Lesson
const getClassLesson = async (ids, token) => {
  const { classId, lessonId } = ids;
  const URL = `instructors/classes/${classId}/lessons/${lessonId}`;

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

/**
 * =============================================================================
 * Instructor Class Students
 * =============================================================================
 */

// Get one instructor pending students list
const getInstructorClassPendingStudents = async (classId, token) => {
  const URL = `instructors/classes/${classId}/students/pending`;

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

// Get approve student into class
const approveStudentToClass = async (ids, token) => {
  const { classId } = ids;
  const URL = `instructors/classes/${classId}/students/approve`;

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

// Get reject student into class
const rejectStudentToClass = async (ids, token) => {
  const { classId } = ids;
  const URL = `instructors/classes/${classId}/students/reject`;

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

// Get all students from class
const getStudentsFromClass = async (classId, token) => {
  const URL = `instructors/classes/${classId}/students`;
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

// Get reject student into class
const deleteStudentFromClass = async (ids, token) => {
  const { classId } = ids;
  const URL = `instructors/classes/${classId}/students/delete`;

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

// Put all the function into authService object before exporting
const instructorService = {
  UserInstructorProfile,
  newClass,
  getInstructorClasses,
  getInstructorClass,
  deleteInstructorClass,
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
