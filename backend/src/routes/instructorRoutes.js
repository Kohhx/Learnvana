const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const classController = require("../controllers/classController");
const lessonController = require("../controllers/lessonController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadImage } = require("../middlewares/multer")
console.log("Upload", uploadImage)

// to use req.user in middle ware, you have to go through middleware { protect }
// and check if req.user exist, only after, can you use req.user globally

/**
 * =============================================================================
 *  INSTRUCTOR
 * =============================================================================
 */

// Create instructor
router.post("/create", protect, instructorController.createInstructor);


// Update instructor profile
router.post("/:instructorId/update", protect,uploadImage.single('avatar'), instructorController.updateInstructorProfile);


/**
 * =============================================================================
 *  CLASSES
 * =============================================================================
 */

// create new class route
router.post("/classes/create", protect, classController.createClass);


// Update instructor class
router.post("/classes/:classId/update", protect, instructorController.updateInstructorClass);


// Get instructor classes
router.get("/classes", protect, classController.getInstructorClasses);


// Get one instructor class
router.get("/classes/:classId", protect, classController.getInstructorClass);


// Instructor delete class from class list - DELETE
router.post(
  "/classes/delete",
  protect,
  instructorController.delete
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


// Get all lessons from a class
router.get(
  "/classes/:classId/lessons",
  protect,
  lessonController.getClassLessons
);


// Get one lesson from a class
router.get(
  "/classes/:classId/lessons/:lessonId",
  protect,
  lessonController.getClassLesson
);


/**
 * =============================================================================
 * STUDENTS, PENDING, ACCEPTANCE, REJECT, DELETE
 * =============================================================================
 */

// Instructor get student list from class - GET
router.get(
  "/classes/:classId/students",
  protect,
  classController.getAllStudentsFromClass
);


// Instructor delete student from class student list - DELETE
router.post(
  "/classes/:classId/students/delete",
  protect,
  classController.deleteStudentFromClass
);


// User add pending user from class pending list
router.post(
  "/:classId/request",
  protect,
  classController.addPendingUserToClass
);


// Instructor get pending students for class - GET
router.get(
  "/classes/:classId/students/pending",
  protect,
  classController.getPendingStudentFromClass
);


// Instructor approve student to class - POST
router.post(
  "/classes/:classId/students/approve",
  protect,
  classController.approveStudentFromClass
);


// Instructor reject student from class - POST
router.post(
  "/classes/:classId/students/reject",
  protect,
  classController.rejectStudentFromClass
);


module.exports = router;
