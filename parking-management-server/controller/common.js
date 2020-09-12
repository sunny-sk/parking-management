const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const ParkingSpace = require("../model/ParkingSpace");
const ParkingZone = require("../model/ParkingZone");
const VehicleParking = require("../model/VehicleParking");

module.exports.initializeApp = asyncHandler(async (req, res, next) => {
  let parkingZone = await ParkingZone.find();
  let parkingSpace = await ParkingSpace.find();
  if (parkingZone.length <= 0) {
    // no parking zone available
    console.log("creatingNew");
    parkingZone = await ParkingZone.insertMany([
      { parking_zone_title: "A" },
      { parking_zone_title: "B" },
      { parking_zone_title: "C" },
    ]);
  } else {
    //do nothing
  }
  ////
  console.log(parkingZone);
  const tempArray = [];
  for (let i = 1; i <= 30; i++) {
    let title = ``;
    if (i <= 10) {
      title = i < 10 ? `A0${i}` : `A10`;
      tempArray.push({
        parking_space_title: title,
        parking_zone_id: parkingZone[0]._id,
      });
    } else if (i > 10 && i <= 20) {
      title = i > 10 && i < 20 ? `B0${i - 10}` : `B10`;
      tempArray.push({
        parking_space_title: title,
        parking_zone_id: parkingZone[1]._id,
      });
    } else {
      title = i > 20 && i < 30 ? `C0${i - 20}` : `C10`;
      tempArray.push({
        parking_space_title: title,
        parking_zone_id: parkingZone[2]._id,
      });
    }
  }

  if (parkingSpace.length <= 0) {
    parkingZone = await ParkingSpace.insertMany(tempArray);
  } else {
    //do nothing
  }

  res.send({
    parkingZone,
    parkingSpace,
  });
});
module.exports.getAllParkingZons = asyncHandler(async (req, res, next) => {
  let parkingZone = await ParkingZone.find().select("parking_zone_title");
  res.status(200).send({
    success: true,
    code: 200,
    count: parkingZone.length,
    parkingZone,
  });
});
module.exports.getAllParkingSpaces = asyncHandler(async (req, res, next) => {
  let parkingSpace = await ParkingSpace.find().populate("parking_zone_id", [
    "parking_zone_title",
  ]);
  res.status(200).send({
    success: true,
    code: 200,
    count: parkingSpace.length,
    parkingSpace,
  });
});

module.exports.bookNewParking = asyncHandler(async (req, res, next) => {
  const {
    parking_zone_id,
    parking_space_id,
    booking_date_time,
    vehicle_registration_number,
  } = req.body;

  const parkingSpace = await ParkingSpace.findById(parking_space_id);
  if (!parkingSpace)
    return next(new ErrorResponse("Parking space id not found", 404));

  const parkingZone = await ParkingZone.findById(parking_zone_id);
  if (!parkingZone)
    return next(new ErrorResponse("Parking zone id not found", 404));

  const vehicleParking = await VehicleParking.findOne({
    parking_space_id: parking_space_id,
  });
  if (vehicleParking)
    return next(
      new ErrorResponse("Parking Space is already filled, try another one", 400)
    );

  const newParking = new VehicleParking({
    parking_zone_id,
    parking_space_id,
    booking_date_time,
    vehicle_registration_number,
  });

  await newParking.save();
  res.status(200).send({
    success: true,
    code: 200,
    newParking,
  });
});
module.exports.releaseParking = asyncHandler(async (req, res, next) => {
  const { vehicleId } = req.params;
  if (!vehicleId)
    return next(new ErrorResponse("Please add Parking space id", 400));
  const vehicle = await VehicleParking.findById(vehicleId);
  if (!vehicle) return next(new ErrorResponse("Vehicle Id not found", 404));
  vehicle.parking_space_id = null;
  vehicle.release_date_time = new Date();
  await vehicle.updateOne();
  res.status(200).send({ success: true, code: 200, vehicle });
});
