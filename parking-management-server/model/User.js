const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// schema for user

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      maxlength: [32, "max character 32"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    token: {
      type: String,
      default: null,
    },
    userType: {
      type: String,
      required: [true, "Please add userType"],
      enum: ["Booking_Counter_Agent", "Parking_Zone_Assistant"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [5, "password minimum lenth should be 5"],
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
