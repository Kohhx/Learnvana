const express = require("express")
const router = express.Router();

const classController = require("../controllers/classController");
const { protect } = require("../middlewares/authMiddleware");

// Get instructor classes
router.get('/instructor-classes', protect, classController.getInstructorClasses)

// Get one instructor class
router.get('/instructor-classes/:classId', protect, classController.getInstructorClass)

// create new class route
// to use req.user in middle ware, you have to go through middleware { protect } and check if
// req.user exist, only after, can you use req.user globally
router.post('/create', protect, classController.createClass)

// User add pending user routes route
router.post('/:classId/request', protect, classController.addPendingUserToClass)


module.exports = router;
