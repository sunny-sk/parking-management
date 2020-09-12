const mongoose = require("mongoose");
const vehicleParking = new mongoose.Schema(
  {
    vehicle_registration_number: {
      type: String,
      required: [true, "Please add a vehicle registration number"],
      maxlength: [32, "max character 32"],
      trim: true,
    },
    parking_zone_id: {
      type: mongoose.Schema.ObjectId,
      ref: "ParkingZone",
      required: [true, "Please add parking zone id"],
    },
    parking_space_id: {
      type: mongoose.Schema.ObjectId,
      ref: "ParkingSpace",
      required: [true, "Please add parking space id"],
    },
    booking_date_time: {
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
