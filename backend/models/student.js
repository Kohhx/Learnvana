const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please enter first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please enter last name"],
    },
    age: {
      type: Number,
      required: [true, "Please enter age"],
    },
    gender: {
      enum: ["male", "female"],
      description: "Must be either male of female",
      required: true,
    },
    avatar: String,
    contact: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (email) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Please enter an email"],
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
