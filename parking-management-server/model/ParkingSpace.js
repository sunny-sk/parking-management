const mongoose = require("mongoose");
const parkingSpace = new mongoose.Schema(
  {
    parking_space_title: {
      type: String,
      required: [true, "Please add a parking space title"],
      maxlength: [32, "max character 32"],
      trim: true,
    },
    parking_zone_id: {
      type: mongoose.Schema.ObjectId,
      ref: "ParkingZone",
    },
  },
  { timestamps: true }
);

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpace);

module.exports = ParkingSpace;
