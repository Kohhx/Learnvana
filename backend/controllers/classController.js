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

  if (user.role !== "student" && user.role !== "guardian") {
    res.status(400);
    throw new Error("Only student or guardian can sign up for classes");
  }

  if (!student) {
    res.status(400);
    throw new Error("No student found");
  }

  if (!classFound) {
    res.status(400);
    throw new Error("No class found");
  }

  const studentsInClass = classFound.students;
  const existingStudent = studentsInClass.find(
    (studentInClass) => studentInClass.toString() === studentId
  );
  if (existingStudent) {
    res.status(400);
    throw new Error("Student is already enrolled in the class.");
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
// @route /api/instructors/classes/:class_id/students/pending
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

// @desc Approve student into class
// @route /api/instructors/classes/:class_id/students/approve
// @access private
exports.approveStudentFromClass = asyncHandler(async (req, res, next) => {

  const { classId } = req.params;
  const { studentId } = req.body;
  const user = await User.findById(req.user.id);
  const classFound = await Class.findById(classId).populate("pending");
  const student = await Student.findById(studentId);

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);
  validation.validateExistent(student, 400, "No student found", res, next);

  // Ensure that student is in pending list
  const finddStudent = classFound.pending.find(
    (pendingStudent) => pendingStudent._id.toString() == student._id.toString()
  );
  if (!finddStudent) {
    res.status(500);
    throw new Error("No student in pending list");
  }

  // Insert into class list
  try {
    classFound.students.push(student);
    await classFound.save();
  } catch (error) {
    res.status(500);
    throw new Error("Error saving class with new student");
  }

  // Insert class into student
  try {
    student.classes.push(classFound);
    await student.save();
  } catch (error) {
    res.status(500);
    throw new Error("Error saving class into student");
  }

  // Remove from student from pending
  try {
    await Class.updateOne(
      { _id: classId },
      { $pullAll: { pending: [student] } }
    );
  } catch (error) {
    res.status(500);
    throw new Error("Error updating class pending list");
  }

  // return pending students
  res.status(201).json({
    message: "Successfully added student to class and removed from pending",
    studentId,
  });
});

// @desc Reject student into class
// @route /api/instructors/classes/:class_id/students/reject
// @access private
exports.rejectStudentFromClass = asyncHandler(async (req, res, next) => {
  const { classId } = req.params;
  const { studentId } = req.body;
  const user = await User.findById(req.user.id);
  const classFound = await Class.findById(classId).populate("pending");
  const student = await Student.findById(studentId);

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);
  validation.validateExistent(student, 400, "No student found", res, next);

  // Ensure that student is in pending list
  const finddStudent = classFound.pending.find(
    (pendingStudent) => pendingStudent._id.toString() == student._id.toString()
  );
  if (!finddStudent) {
    res.status(500);
    throw new Error("No student in pending list");
  }

  // Remove from student from pending
  try {
    await Class.updateOne(
      { _id: classId },
      { $pullAll: { pending: [student] } }
    );
  } catch (error) {
    res.status(500);
    throw new Error("Error updating class pending list");
  }

  // return pending students
  res.status(201).json({
    message: "Successfully rejected and removed from pending",
    studentId,
  });
});

// @desc Get all student from class
// @route /api/instructors/classes/:class_id/students
// @access private
exports.getAllStudentsFromClass = asyncHandler(async (req, res, next) => {
  console.log("3");
  const { classId } = req.params;
  const user = await User.findById(req.user.id);
  const classFound = await Class.findById(classId).populate("students");

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);
  console.log("4");
  // return pending students
  res.status(201).json(classFound.students);
});

// @desc Delete student from class
// @route /api/instructors/classes/:class_id/students/delete
// @access private
exports.deleteStudentFromClass = asyncHandler(async (req, res, next) => {
  const { classId } = req.params;
  const { studentId } = req.body;
  const user = await User.findById(req.user.id);
  const classFound = await Class.findById(classId).populate("students");
  const student = await Student.findById(studentId);

  // Validate
  validation.validateUser(user, res, next);
  validation.validateRole(user, "instructor", res, next);
  validation.validateClassBelongsInstructor(user, classFound, res, next);
  validation.validateExistent(student, 400, "No student found", res, next);

  // Ensure that student is in class list
  const finddStudent = classFound.students.find(
    (classStudent) => classStudent._id.toString() == student._id.toString()
  );
  if (!finddStudent) {
    res.status(500);
    throw new Error("No student in class list");
  }

  // Remove from student from pending
  try {
    await Class.updateOne(
      { _id: classId },
      { $pullAll: { students: [student] } }
    );
  } catch (error) {
    res.status(500);
    throw new Error("Error updating class list");
  }

  // return student id that has been deleted
  res.status(201).json({
    message: "Successfully removed student from class list",
    studentId,
  });
});
