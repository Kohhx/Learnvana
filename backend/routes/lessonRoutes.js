const express = require("express")
const router = express.Router();

const lessonController = require("../controllers/lessonController");
const { protect } = require("../middlewares/authMiddleware");

// Get instructor lessons
router.get('/instructor-classes/:classId/instructor-lessons', protect, lessonController.getInstructorLessons)

// Get one instructor class
router.get('/instructor-classes/:classId/instructor-lessons/:lessonId', protect, lessonController.getInstructorLesson)

// create new class route
router.post('/create', protect, lessonController.createLesson)



module.exports = router;
