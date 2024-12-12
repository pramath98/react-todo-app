const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const dbo = require("./db/conn"); // Import the DB connection module

const app = express();
const port = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// API Routes
const recordRouter = require("./routes/record");
app.use("/", recordRouter);

// Serve Frontend for Production
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Initialize the application
(async () => {
  try {
    const isConnected = await dbo.connectToServer(); // Await the database connection
    if (!isConnected) {
      console.error("Database connection failed.");
      process.exit(1); // Exit if the database connection fails
    }
    console.log("Database connection established.");

    // Start the server only after DB connection is ready
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error("Error initializing application:", err);
    process.exit(1); // Exit if there's an unhandled error
  }
})();

module.exports = app;
