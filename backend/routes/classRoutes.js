const express = require("express")
const router = express.Router();
const classController = require("../controllers/classController");
const { protect } = require("../middlewares/authMiddleware")

// User add pending user routes route
router.post('/:class_id/request', protect, classController.addPendingUserToClass)

module.exports = router;
