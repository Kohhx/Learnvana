const express = require("express")
const router = express.Router();
const studentController = require("../controllers/studentController");
const { protect } = require("../middlewares/authMiddleware")

// Create student
router.post('/create', protect, studentController.createStudent)

module.exports = router;
