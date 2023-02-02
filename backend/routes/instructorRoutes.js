const express = require("express")
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const { protect } = require("../middlewares/authMiddleware")

// Create instructor
router.post('/create', protect, instructorController.createInstructor)

module.exports = router;
