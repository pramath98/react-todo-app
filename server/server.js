const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const dbo = require("./db/conn"); // Import DB connection
const serverless = require("serverless-http"); // Import serverless-http

const app = express();
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

// Connect to MongoDB before starting the server
const startServer = async () => {
  try {
    const isConnected = await dbo.connectToServer();
    if (isConnected) {
      console.log("Successfully connected to MongoDB.");
      // Start the server once DB is connected
      const handler = serverless(app);
      module.exports = handler;
    } else {
      console.error("Database connection failed.");
      process.exit(1); // Stop the app if DB connection fails
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if there’s an error connecting to DB
  }
};

startServer(); // Start the DB connection and then the server

