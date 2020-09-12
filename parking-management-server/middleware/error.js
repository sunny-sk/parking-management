const ErrorResponse = require("../");

const errorHandler = (err, req, res, next) => {
  let error = {
    success: false,
    code: 500,
    message: "server error",
  };
  //

  // console.log(err.name);
  // console.log(err);

  //token invalid
  if (err.name === "JsonWebTokenError") {
    error.success = false;
    error.code = 401;
    error.message = "Invalid Token";
  }

  //duplicate key error
  if (err.name === "MongoError") {
    error.success = false;
    error.code = 400;
    error.message = " duplicate key error";
  }

  //validation error
  if (err.name === "ValidationError") {
    error.success = false;
    error.code = 400;
    error.message = Object.values(err.errors)
      .map((value) => value.message)
      .join(",");
  }
  // custom thron error
  if (err.name === "Error") {
    error.success = false;
    error.code = err.status;
    error.message = err.message;
  }
  // mongo object Id error
  if (err.name === "CastError") {
    error.success = false;
    error.code = 400;
    error.message = err.message;
  }

  res.status(error.code).json({
    success: error.success,
    code: error.code,
    message: error.message,
  });
};

module.exports = errorHandler;
