const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const User = require("../models/user");

// @desc create a new student
// @route /api/student/create
// @access user
exports.createStudent= asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error("User not logged in");
  }

  if (!user.role === "student" && !user.role === "guardian"){
    res.status(400);
    throw new Error("Only guardian or student account can create student profile");
  }

  if (user.role == "student" && user.studentprofiles.length > 0) {
    res.status(400);
    throw new Error("Student account can only create 1 student profile");
  }

  const { first_name, last_name, age, gender, email, contact, avatar} = req.body;

  if (!first_name || !last_name || !age || !gender || !email) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const student = await Student.create({
    first_name,
    last_name,
    age,
    gender,
    email,
    contact: contact || null,
    avatar: avatar || null,
  })

  user.studentprofiles.push(student);
  await user.save();
  // const user1 = await User.findById(req.user.id).populate("studentprofiles");
  // console.log(user1)

  res.status(200).json({
    _id: student._id,
    first_name: student.first_name,
    last_name: student.last_name,
    age: student.age,
    gender: student.gender,
    email: student.email,
    contact: student.contact,
    avatar: student.avatar,
  })

});