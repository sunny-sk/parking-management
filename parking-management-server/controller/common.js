const asyncHandler = require("../middleware/asyncHandler");

const ParkingSpace = require("../model/ParkingSpace");
const ParkingZone = require("../model/ParkingZone");

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

module.exports.bookNewParking = asyncHandler(async (req, res, next) => {});
module.exports.releaseParking = asyncHandler(async (req, res, next) => {});
