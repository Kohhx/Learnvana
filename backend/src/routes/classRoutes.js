const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");
const classController = require("../controllers/classController");
const lessonController = require("../controllers/lessonController");
const { protect } = require("../middlewares/authMiddleware");

// Request student to join a class
router.post(
  "/:classId/request",
  protect,
  classController.addPendingUserToClass
);

module.exports = router;
