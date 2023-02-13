const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const classController = require("../controllers/classController");
const lessonController = require("../controllers/lessonController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * =============================================================================
 *                                INSTRUCTOR
 * =============================================================================
 */

/**
 * =============================================================================
 *  PROFILE
 * =============================================================================
 */

// Create instructor
router.post("/create", protect, instructorController.createInstructor);

/**
 * =============================================================================
 *  CLASSES
 * =============================================================================
 */
// create new class route
// to use req.user in middle ware, you have to go through middleware { protect }
// and check if req.user exist, only after, can you use req.user globally
router.post("/classes/create", protect, classController.createClass);

// Get instructor classes
router.get("/classes", protect, classController.getInstructorClasses);

// Get one instructor class
router.get("/classes/:classId", protect, classController.getInstructorClass);

// User add pending user from class pending list
router.post(
  "/:classId/request",
  protect,
  classController.addPendingUserToClass
);

// Instructor get pending students for class - GET
router.get(
  "/classes/:classId/pending",
  protect,
  classController.getPendingStudentFromClass
);

// Instructor approve student to class - POST
router.post(
  "/classes/:classId/approve",
  protect,
  classController.approveStudentFromClass
);

// Instructor reject student from class - POST
router.post(
  "/classes/:classId/reject",
  protect,
  classController.rejectStudentFromClass
);

// Instructor get student list from class - GET
router.get(
  "/classes/:classId/students",
  protect,
  classController.getAllStudentsFromClass
);

/**
 * =============================================================================
 *  LESSONS
 * =============================================================================
 */

// create new lesson route
router.post(
  "/classes/:classId/lessons/create",
  protect,
  lessonController.createLesson
);

// Get instructor lessons
router.get(
  "/classes/:classId/lessons",
  protect,
  lessonController.getInstructorLessons
);

// Get one instructor class
router.get(
  "/classes/:classId/lessons/:lessonId",
  protect,
  lessonController.getInstructorLesson
);

module.exports = router;
