const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const path = require("path");
const dbo = require("./db/conn"); // Import DB connection
const serverless = require("serverless-http");

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
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// Check if we're in the serverless environment (Vercel)
if (process.env.NODE_ENV === "production") {
  // If in production, use serverless
  const handler = serverless(app);
  module.exports = handler; // Export the serverless handler for Vercel
} else {
  // If in development, run Express server normally
  dbo.connectToServer()
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    });
}
