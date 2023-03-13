const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema(
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
      type: String,
      enum: ["male", "female"],
      description: " Must be either male of female",
      required: true,
    },
    // avatar: String,
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
    contact: {
      type: String,
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
    experience: {
      type: String,
      // minlength: 50,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Instructor", instructorSchema);
