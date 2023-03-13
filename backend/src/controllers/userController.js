const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinaryHelper = require("../utility/cloudinaryHelper");
const validation = require("../utility/validation");

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
      avatar: user.avatar || null,
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

// @desc Update a new user
// @route /api/users/update
// @access private
exports.updateUser = asyncHandler(async (req, res, next) => {
  console.log("Start user update")
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const { file } = req;

  let user = await User.findById(req.user.id);

  // Validate if user exist
  validation.validateUser(user, res, next);

  // Update email
  user.email = email;

  // Validate oldpassword
  const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

  if (passwordIsValid) {
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

  }

  const oldPublicId = user.avatar?.public_id;

  // Remove old avatar first
  if (oldPublicId && file) {
    // Check if there avatar exist
    const destroyRes = cloudinaryHelper.deleteFile(oldPublicId, "image");
  }

  // Add new image to avatar if file exist
  if (file) {
    const { secure_url, public_id } = await cloudinaryHelper.uploadPhoto(file, {
      resource_type: "image",
      gravity: "face",
      height: 150,
      width: 150,
      crop: "thumb",
    });

    user.avatar = { url: secure_url, public_id };
  }

  try {
    await user.save();
    console.log(user)
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
  console.log("5")

  res.status(200).json({
    email: user.email,
    avatar: user.avatar || null,
  });
});

// Utility Functions
// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
