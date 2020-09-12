const mongoose = require("mongoose");

// schema for parking Zone

const parkingZone = new mongoose.Schema(
  {
    parking_zone_title: {
      type: String,
      required: [true, "Please add a parking zone title"],
      enum: ["A", "B", "C"],
    },
  },
  { timestamps: true }
);

const ParkingZone = mongoose.model("ParkingZone", parkingZone);

module.exports = ParkingZone;
