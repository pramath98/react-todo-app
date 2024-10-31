const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const ALLOWED_ORIGIN=process.env.ALLOWED_ORIGIN;
const recordRouter = require("./routes/record");
app.use(cors({
  origin: ALLOWED_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use('/',recordRouter);
// get driver connection
if(process.env.NODE_ENV==='development'){
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
const dbo = require("./db/conn");
dbo.connectToServer(function (err) {
  if (err) console.error(err);
 });
 module.exports = app;