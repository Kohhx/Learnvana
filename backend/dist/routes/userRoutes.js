const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User signup route
router.post("/signup", userController.signupUser);

// User Login route
router.post("/login", userController.loginUser);
module.exports = router;