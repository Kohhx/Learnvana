const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1)
  }
};

module.exports = connectDB;
