const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import Model
const User = require("../models/user");

// @desc Register a new user
// @route /api/users/signup
// @access Public
exports.signupUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  // Validation
  if (!email || !password || !role) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("User already exist!");
    res.status(400);
    throw new Error("User already exist!");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Register a new user
// @route /api/users/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("Login in");
  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const user = await User.findOne({ email }).populate(
    "studentprofiles instructorprofile"
  );

  console.log(user);

  if (!user) {
    res.status(400);
    throw new Error("No such user. Please create an account");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (passwordIsValid) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      profiles:
        user.role == "instructor"
          ? user.instructorprofile
          : user.role == "student"
          ? user.studentprofiles[0]
          : user.studentprofiles,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect credentials. Try again");
  }
});

// Utility Functions
// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
