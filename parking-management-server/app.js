// importing packages
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connctDB = require("./config/db");
const path = require("path");
const port = process.env.PORT || 8100;
require("colors");
//config files
dotenv.config({ path: "./config/config.env" });
//static folder
app.use(express.static(path.join(__dirname, "public")));
//setting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
//Mongoose need variable set
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

//routes
const common = require("./routes/common");
const user = require("./routes/user");
const { initiateInitialUser } = require("./controller/user");
const errorHandler = require("./middleware/error");
// initiating user
initiateInitialUser();
app.use("/api/v1/common", common);
app.use("/api/v1/auth", user);
app.use("/", (req, res, next) => {
  res.status(200).send({ success: true, message: "server up" });
});

//globle error handler
app.use(errorHandler);

//server spin up
app.listen(port, () => {
  console.log(`Server started at ${port} ${process.env.NODE_ENV}`.yellow.bold);
  connctDB();
});

//Exception handling
process.on("uncaughtException", (err, promise) => {
  console.log(`error: ${err.message}`);
  process.exit(1);
});

//umhandled exception
process.on("unhandledRejection", (err, promise) => {
  console.log(`error : ${err.message}`.red.bold);
  process.exit(1);
});

// exporting app for clustering if require

module.exports = app;
