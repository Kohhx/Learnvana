// const asyncHandler = require("express-async-handler");
// const Student = require("../models/student");
// const Class = require("../models/class");

// // @desc store user as pending in class
// // @route /api/classes/add
// // @access user

// exports.addPendingUserToClass = asyncHandler(async (req, res) => {
//   const user = req.user;
//   const studentId = req.body.id;
//   const classId = req.params;

//   const student = await Student.findbyId(studentId);
//   const classFound = await Class.findbyId(classId);

//   if (!user) {
//     res.status(400);
//     throw new Error("User not logged in");
//   }

//   if (!studentId) {
//     res.status(400);
//     throw new Error("No student found");
//   }

//   if (!classFound) {
//     res.status(400);
//     throw new Error("No class found");
//   }

//   classFound.pending.push(student);

//   try {
//     await classFound.save();
//     const updatedClass = await Class.findbyId(classId);
//     res.status(200).json({
//       message: "Request sent. Pending approval"
//     })
//   } catch (error) {
//     res.status(400);
//     throw new Error("Error occured");
//   }
// });
