const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { errorHandler } = require("./middlewares/errorMiddleware")
const connectDB = require("./config/db");


/**
 * =============================================================================
 * Connect mongoDB
 * =============================================================================
 */
connectDB();

/**
 * =============================================================================
 * Initialize Express server
 * =============================================================================
 */
const app = express();

/**
 * =============================================================================
 * Initialize body parser
 * =============================================================================
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * =============================================================================
 * CORS Handling
 * =============================================================================
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});


/**
 * =============================================================================
 * Routes handling
 * =============================================================================
 */

// Root Page
app.get("/", (req, res) => {
  res.status(201).json({ message: "Welcome to Learnvana" });
});

// User routes
app.use("/api/users", require("./routes/userRoutes"));

/**
 * =============================================================================
 * Final stage Error Middleware Handling
 * =============================================================================
 */
app.use(errorHandler);
//
/**
 * =============================================================================
 * Listen to port and run server
 * =============================================================================
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
