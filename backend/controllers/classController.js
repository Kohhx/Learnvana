const asyncHandler = require("express-async-handler");

// Import Model
const Student = require("../models/student");
const Class = require("../models/class");
const User = require("../models/user");

// @desc store user as pending in class
// @route /api/classes/create
// @access user
exports.createClass = asyncHandler(async (req, res) => {
  const { title, status, images, address } = req.body;

  // Validation
  if (!title || !status || !images || !address) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (req.user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  // Create class
  try {
    const newClass = await Class.create({
      title,
      status,
      images,
      address,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  if (newClass) {
    res.status(201).json({
      _id: newClass._id,
      title: newClass.title,
      status: newClass.status,
      images: newClass.images,
      address: newClass.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid class data");
  }
});

// User Pending Request action
exports.addPendingUserToClass = asyncHandler(async (req, res) => {
  const studentId = req.body.id;
  const classId = req.params.class_id;

  console.log(studentId);

  const user = await User.findById(req.user.id);
  const student = await Student.findById(studentId);
  const classFound = await Class.findById(classId);

  if (!user) {
    res.status(400);
    throw new Error("User not logged in");
  }

  if (!student) {
    res.status(400);
    throw new Error("No student found");
  }

  if (!classFound) {
    res.status(400);
    throw new Error("No class found");
  }

  classFound.pending.push(student);

  try {
    await classFound.save();
    const updatedClass = await Class.findbyId(classId);
    res.status(200).json({
      message: "Request sent. Pending approval",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error occured");
  }
});
