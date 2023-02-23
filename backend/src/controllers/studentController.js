const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Student = require("../models/student");
const Class = require("../models/class");



/**
 * =============================================================================
 * Student
 * =============================================================================
 */

exports.createStudent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log(user);

  if (!user) {
    res.status(400);
    throw new Error("User not logged in");
  }

  if (!user.role === "student" && !user.role === "guardian") {
    res.status(400);
    throw new Error(
      "Only guardian or student account can create student profile"
    );
  }

  if (user.role == "student" && user.studentprofiles.length > 0) {
    res.status(400);
    throw new Error("Student account can only create 1 student profile");
  }

  const { first_name, last_name, age, gender, email, contact, avatar } =
    req.body;

  if (!first_name || !last_name || !age || !gender || !email) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  console.log("REQBODY", req.body);

  let student;
  try {
    student = await Student.create({
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

  user.studentprofiles.push(student);

  try {
    await user.save();
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }


  res.status(200).json([{
    _id: student._id,
    first_name: student.first_name,
    last_name: student.last_name,
    age: student.age,
    gender: student.gender,
    email: student.email,
    contact: student.contact,
    avatar: student.avatar,
  }]);
});


/**
 * =============================================================================
 * Student Classes
 * =============================================================================
 */

exports.getStudentClasses = asyncHandler(async (req, res) => {
  console.log("WHat")
  const user = await User.findById(req.user.id);
  const { studentId } = req.body;
  console.log("studentId",studentId)
  const student = await Student.findById(studentId).populate(
    "classes"
  );
  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "student" && user.role !== "guardian") {
    res.status(400);
    throw new Error("User is not a student or a guardian");
  }

  if (!student) {
    res.status(400);
    throw new Error(
      "No student profile created. Create student profile first"
    );
  }

  const studentClasses = student.classes;

  console.log(studentClasses);

  res.status(201).json(studentClasses);
});

exports.getAllStudentsFromClass = asyncHandler(async (req, res) => {
  console.log("3");
  const { classId } = req.params;
  const user = await User.findById(req.user.id);
  const classFound = await Class.findById(classId).populate("students");


  // return pending students
  res.status(201).json(classFound.students);
});


/**
 * =============================================================================
 * Student class lessons
 * =============================================================================
 */

exports.getClassLessons = asyncHandler(async (req, res) => {
  const classId = req.params.classId;

  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  const user = await User.findById(req.user.id);
  const student = await Student.findById(user.studentprofiles);
  // const instructor = await Instructor.findById(user.instructorprofile).populate(
  //   { "classes" }
  // );
  //

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "student") {
    res.status(400);
    throw new Error("User is not a student");
  }

  if (!student) {
    res.status(400);
    throw new Error(
      "No student profile created. Create student profile first"
    );
  }

  if (!classFound.students.toString() === user._id.toString()) {
    res.status(400);
    throw new Error("Class does not belong to this student");
  }

  const classLessons = classFound.lessons;

  console.log(classLessons);

  res.status(201).json(classLessons);
});


// get one lesson from a class

exports.getClassLesson = asyncHandler(async (req, res) => {
  const classId = req.params.classId;
  const lessonId = req.params.lessonId;
  // const {classId, lessonId} = req.params;
  // javascript destructruting


  let classFound;
  try {
    classFound = await Class.findById(classId);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  // String.prototype.toObjectId = function() {
  //   var ObjectId = (require('mongoose').Types.ObjectId);
  //   return new ObjectId(this.toString());
  // };
  // console.log(lessonId.toObjectId())
  // console.log(classFound.lessons[3]._id)
  // console.log(classFound.lessons[3].id === lessonId)
  function findLesson(lessonId) {
    for (let i=0; i < classFound.lessons.length; i++) {
      if (classFound.lessons[i].id === lessonId) {
        // console.log(i);
        // x = i;
        return i;
      }
    }
  };

  let lessonFound;
  try {
    lessonFound = await classFound.lessons[findLesson(lessonId)]
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }

  const user = await User.findById(req.user.id);
  const student = await Student.findById(user.studentprofiles).populate(
    { path: 'classes', select: 'lessons' }
  );

  if (!user) {
    res.status(400);
    throw new Error("No user found");
  }

  if (user.role !== "student") {
    res.status(400);
    throw new Error("User is not a student");
  }

  if (!student) {
    res.status(400);
    throw new Error(
      "No student profile created. Create student profile first"
    );
  }

  if (!classFound.students.toString() === user._id.toString()) {
    res.status(400);
    throw new Error("Class does not belong to this instructor");
  }


  console.log(lessonFound);

  res.status(201).json(lessonFound);
});
