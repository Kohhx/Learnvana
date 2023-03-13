const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email!"],
      unique: true,
      validate: {
        validator: (email) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
    },
    role: {
      type: String,
      enum: ["student", "instructor", "guardian"],
      description: " Must be either student, instructor or guardian",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    studentprofiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    instructorprofile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
    },
     // avatar: String,
     avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
