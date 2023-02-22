const asyncHandler = require("express-async-handler");
const validation = require("../utility/validation");
const Student = require("../models/student");

// Import Model
const User = require("../models/user");

// @desc Guardian can create students after signup
// @route /api/guardians/create
// @access private
exports.createStudents = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.user.id).populate("studentprofiles");
  validation.validateUser(user, res, next);
  validation.validateRole(user, "guardian", res, next);

  const students = req.body;

  let studentsCreated = [];
  for (let student of students) {
    console.log(student);
    const { first_name, last_name, age, gender, email, contact, avatar } =
      student;

    if (!first_name || !last_name || !age || !gender || !email) {
      res.status(400);
      throw new Error("Please include all fields");
    }

    let studentCreated;
    try {
      studentCreated = await Student.create({
        first_name,
        last_name,
        age,
        gender,
        email,
        contact: contact || null,
        avatar: avatar || null,
      });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }

    user.studentprofiles.push(studentCreated);
    studentsCreated.push(studentCreated);
  }

  try {
    await user.save();
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  res.status(200).json(user.studentprofiles);
});

// @desc Guardian can get all students
// @route /api/guardians/students
// @access private
exports.getStudents = asyncHandler(async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.user.id).populate({
      path: "studentprofiles",
      populate: {
        path: "classes",
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  res.status(200).json(user.studentprofiles);
});
