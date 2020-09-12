const express = require("express");
const router = express.Router();
var pdf = require("html-pdf");
//importing controller methods
const {
  initializeApp,
  getAllParkingZons,
  getAllParkingSpaces,
  bookNewParking,
  getAllVehiclesParking,
  releaseParking,
  generatePdf,
} = require("../controller/common");

const { protect, authorize } = require("../middleware/auth");

//routes
router.get("/getReport", generatePdf);
router.post(
  "/initalizeApp",
  protect,
  authorize("Booking_Counter_Agent"),
  initializeApp
);
router.get("/parkingZones", getAllParkingZons);
router.get("/getAllParkingSpaces", getAllParkingSpaces);
router.get("/getAllVehiclesParking", getAllVehiclesParking);
router.post(
  "/book-new-parking",
  protect,
  authorize("Booking_Counter_Agent"),
  bookNewParking
);
router.delete(
  "/release-parking/:vehicleId",
  protect,
  authorize("Booking_Counter_Agent"),
  releaseParking
);

module.exports = router;
