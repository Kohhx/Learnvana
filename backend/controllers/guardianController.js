const asyncHandler = require("express-async-handler");
const validation = require("../utility/validation");
const Student = require("../models/student");

// Import Model
const User = require("../models/user");

exports.createStudents = asyncHandler(async (req, res, next) => {
  console.log("I am in");

  const user = await User.findById(req.user.id).populate("studentprofiles");
  validation.validateUser(user, res, next);
  validation.validateRole(user, "guardian", res, next);

  const students = req.body;



  let studentsCreated = [];
  for (let student of students) {
    console.log(student)
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
    studentsCreated.push(studentCreated)
  }

  // console.log("After",user)
  // console.log(studentsCreated)

  try {
    await user.save();
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

    console.log(user.studentprofiles)

  res.status(200).json(user.studentprofiles);
});
