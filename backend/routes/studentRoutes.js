const express = require("express")
const router = express.Router();
const studentController = require("../controllers/studentController");
const { protect } = require("../middlewares/authMiddleware")

// Create student
router.post('/create', protect, studentController.createStudent)

// get student classes
router.get('/classes', protect, studentController.getStudentClasses)


module.exports = router;
