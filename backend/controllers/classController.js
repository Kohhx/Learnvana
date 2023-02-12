const asyncHandler = require("express-async-handler");
const validation = require("../utility/validation");

// Import Model
const Student = require("../models/student");
const Instructor = require("../models/instructor");
const Class = require("../models/class");
const User = require("../models/user");

// @desc Get one instructor class
// @route /api/instructors/classes/:classId
// @access private
exports.getInstructorClass = asyncHandler(async (req, res) => {
  console.log("/api/classes/instructor-classes/:classId");
  const classId = req.params.classId;

  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile).populate(
    "classes"
  );

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  if (!instructor) {
    res.status(400);
    throw new Error(
      "No instructor profile created. Create instructor profile first"
    );
  }

  if (!classFound.instructor.toString() === user._id.toString()) {
    res.status(400);
    throw new Error("Class does not belong to this instructor");
  }

  console.log(classFound);

  res.status(201).json(classFound);
});

// @desc Get all instructor classes
// @route /api/instructors/classes
// @access private
exports.getInstructorClasses = asyncHandler(async (req, res) => {
  console.log("/api/classes/instructor-classes");
  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile).populate(
    "classes"
  );

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  if (!instructor) {
    res.status(400);
    throw new Error(
      "No instructor profile created. Create instructor profile first"
    );
  }

  const instructorClasses = instructor.classes;

  console.log(instructorClasses);

  res.status(201).json(instructorClasses);
});

// @desc Instructor can create a class
// @route /api/instructors/classes/create
// @access private
exports.createClass = asyncHandler(async (req, res) => {
  console.log("test to see");
  const { title, status, images, address } = req.body;

  const user = await User.findById(req.user.id);
  const instructor = await Instructor.findById(user.instructorprofile);

  console.log(instructor);

  // Validation
  if (!title || !status || !images || !address) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "instructor") {
    res.status(400);
    throw new Error("User is not a instructor");
  }

  if (!instructor) {
    res.status(400);
    throw new Error(
      "No instructor profile created. Create instructor profile first"
    );
  }

  // Create class
  let newClass;
  try {
    newClass = await Class.create({
      title,
      status,
      images,
      address,
      instructor,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong");
  }

  // Add class to instructor
  try {
    instructor.classes.push(newClass);
    await instructor.save();
  } catch (error) {
    res.status(500);
    throw new Error("Something went wrong with adding classes to instructor");
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

// @desc Add pending student request to class
// @route /api/classes/:class_id/request
// @access private
exports.addPendingUserToClass = asyncHandler(async (req, res) => {
  console.log("Start adding student request");
  const { studentId } = req.body;
  const { classId } = req.params;

  console.log(studentId);

  const user = await User.findById(req.user.id);
  const student = await Student.findById(studentId);
  const classFound = await Class.findById(classId);

  if (!user) {
    res.status(400);
    throw new Error("User not logged in");
  }

  if (user.role !== "student") {
    res.status(400);
    throw new Error("Only student can sign up for classes");
  }

  if (!student) {
    res.status(400);
    throw new Error("No student found");
  }

  if (!classFound) {
    res.status(400);
    throw new Error("No class found");
  }

  const pendings = classFound.pending;
  const existingPending = pendings.find(
    (pending) => pending.toString() === studentId
  );
  if (existingPending) {
    res.status(400);
    throw new Error(
      "Student is already in the pending list. Wait for instructor to approve."
    );
  }

  classFound.pending.push(student);

  try {
    await classFound.save();
    console.log("Request sent. Pending approval");
    res.status(200).json({
      message: "Request sent. Pending approval",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error occured");
  }
});

// @desc Get list of pending student request to class
// @route /api/instructors/classes/:class_id/pending
// @access private
exports.getPendingStudentFromClass = asyncHandler(async (req, res, next) => {
  const { classId } = req.params;

  const user = await User.findById(req.user.id);
  const classFound = await Class.findById(classId).populate("pending");

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);

  // return pending students
  res.status(201).json(classFound.pending);
});
