const express = require("express");
const router = express.Router();

//importing controller methods
const {
  initializeApp,
  getAllParkingZons,
  getAllParkingSpaces,
  bookNewParking,
  releaseParking,
} = require("../controller/common");

//routes
router.post("/initalizeApp", initializeApp);
router.get("/parkingZones", getAllParkingZons);
router.get("/getAllParkingSpaces", getAllParkingSpaces);
router.post("/book-new-parking", bookNewParking);
router.delete("/release-new-parking/:id", releaseParking);

module.exports = router;
