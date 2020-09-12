const mongoose = require("mongoose");
const vehicleParking = new mongoose.Schema(
  {
    parking_zone_id: {
      type: mongoose.Schema.ObjectId,
      ref: "ParkingZone",
    },
    parking_space_id: {
      type: mongoose.Schema.ObjectId,
      ref: "ParkingSpace",
    },
    booking_date: {
      type: Date,
      required: [true, "Please add booking_date_time"],
    },
    release_date_time: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const VehicleParking = mongoose.model("VehicleParking", vehicleParking);

module.exports = VehicleParking;
