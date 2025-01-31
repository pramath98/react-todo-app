const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const path = require("path");
const dbo = require("./db/conn"); // Import DB connection

const app = express();
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

// Middleware
app.use(cors({
  origin: ALLOWED_ORIGIN,
  credentials: true,
}));

// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.json());

// API Routes
const recordRouter = require("./routes/record");
app.use("/", recordRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

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

