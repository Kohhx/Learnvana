const express = require("express");
const router = express.Router();
const guardianController = require("../controllers/guardianController");
const {
  protect
} = require("../middlewares/authMiddleware");

/**
 * =============================================================================
 *  GUARDIAN PROFILE
 * =============================================================================
 */

// Guardian Create students - POST
router.post("/create", protect, guardianController.createStudents);

// Guardian get all students - GET
router.get("/students", protect, guardianController.getStudents);
module.exports = router;