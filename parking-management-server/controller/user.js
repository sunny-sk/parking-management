const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/User");
const crypto = require("crypto");
const _ = require("lodash");

module.exports.initiateInitialUser = async () => {
  try {
    const one = {
      name: "booking agent",
      email: "bookingagent@gmail.com",
      password: "booking@123",
      userType: "Booking_Counter_Agent",
    };
    const two = {
      name: "parking assistant",
      email: "parkingAssistant@gmail.com",
      password: "parking@123",
      userType: "Parking_Zone_Assistant",
    };

    let parkingAssistant = await User.findOne({ email: two.email });
    let bookingAgent = await User.findOne({ email: one.email });

    if (!bookingAgent) {
      bookingAgent = new User({ ...one });
      const hashedPassword = crypto
        .createHash("sha256", 10)
        .update(one.password)
        .digest("hex");
      const token = bookingAgent.generateAuthToken();
      bookingAgent.password = hashedPassword;
      bookingAgent.token = token;
      await bookingAgent.save();
    } else {
      console.log("booking agent exist");
    }
    if (!parkingAssistant) {
      parkingAssistant = new User({ ...two });
      const hashedPassword = crypto
        .createHash("sha256", 10)
        .update(two.password)
        .digest("hex");
      const token = parkingAssistant.generateAuthToken();
      parkingAssistant.password = hashedPassword;
      parkingAssistant.token = token;
      await parkingAssistant.save();
    } else {
      console.log("parking assistant exist");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.signupUser = asyncHandler(async (req, res, next) => {});

module.exports.signinUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(new ErrorResponse("please add email field", 400));
  if (!password)
    return next(new ErrorResponse("please add password field", 400));
  const user = await User.findOne({ email: email });
  if (!user)
    return next(new ErrorResponse("user not registerd with this email", 404));
  const hashedPassword = crypto
    .createHash("sha256", 10)
    .update(password)
    .digest("hex");

  if (hashedPassword !== user.password)
    return next(new ErrorResponse("invalid email or password", 400));

  const token = user.generateAuthToken();
  user.token = token;
  await user.save();
  res.status(200).send({
    success: true,
    code: 200,
    user: _.pick(user, ["_id", "name", "email", "token", "userType"]),
  });
});
