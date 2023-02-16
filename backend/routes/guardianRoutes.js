const express = require("express");
const router = express.Router();
const guardianController = require("../controllers/guardianController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * =============================================================================
 *  GUARDIAN PROFILE
 * =============================================================================
 */

// Guardian Create students
router.post("/create", protect, guardianController.createStudents);





module.exports = router;
