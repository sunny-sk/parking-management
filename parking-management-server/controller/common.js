const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const ParkingSpace = require("../model/ParkingSpace");
const ParkingZone = require("../model/ParkingZone");
const VehicleParking = require("../model/VehicleParking");
var fs = require("fs");
var path = require("path");
var pdf = require("html-pdf");
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

  await VehicleParking.deleteMany({});

  res.send({
    success: true,
    code: 200,
    message: "Successfully initialize app",
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
  let parkingSpace = await ParkingSpace.find()
    .populate("parking_zone_id", ["parking_zone_title"])
    .populate("parked_vehicle");
  res.status(200).send({
    success: true,
    code: 200,
    count: parkingSpace.length,
    parkingSpace,
  });
});
module.exports.getAllVehiclesParking = asyncHandler(async (req, res, next) => {
  let vehicleParking = await VehicleParking.find();
  res.status(200).send({
    success: true,
    code: 200,
    count: vehicleParking.length,
    vehicleParking,
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
  let vehicle = await VehicleParking.findById(vehicleId);
  if (!vehicle) return next(new ErrorResponse("Vehicle Id not found", 404));

  vehicle = await VehicleParking.findByIdAndUpdate(
    vehicle._id,
    {
      parking_space_id: null,
      release_date_time: new Date(),
    },
    { new: true }
  );
  res.status(200).send({ success: true, code: 200, vehicle });
});

module.exports.generatePdf = asyncHandler(async (req, res, next) => {
  let parkingSpace = await ParkingSpace.find()
    .populate("parking_zone_id", ["parking_zone_title"])
    .populate("parked_vehicle");

  let one = "";

  const x = `${parkingSpace.map((e) => {
    one += `<tr>
        <td>${e.parking_zone_id.parking_zone_title}</td>
        <td>${e.parking_space_title}</td>
        <td>
          ${
            e.parked_vehicle.length > 0
              ? e.parked_vehicle[0].vehicle_registration_number
              : "-"
          }
        </td>
        <td>${e.parked_vehicle.length > 0 ? "occupied" : "Vacent"}</td>
        <td>
          ${
            e.parked_vehicle.length > 0
              ? e.parked_vehicle[0].booking_date_time
              : "-"
          }
        </td>
        <td>
          ${
            e.parked_vehicle.length > 0 && e.parked_vehicle[0].release_date_time
              ? e.parked_vehicle[0].booking_date_time
              : "-"
          }
        </td>
      </tr>`;
  })}`;
  const p = `<html>
  <head>
    <style>
      table {
        border-collapse: collapse;
      }
      table,
      td {
        text-align: center;
        border: 1px solid black;
      }
      th {
        color: white;
        padding: 10px;
        background-color: black;
      }
      td {
        padding: 5px;
      }
    </style>
  </head>
  <body>
    <div style="width: 80%; margin-left: 10%">
      <br />
      <div style="text-align: center">
        <h2>Parking Report</h2>
      </div>
      <br />
      <table style="width: 100%">
        <tr>
          <th>Parking Zone</th>
          <th>Parking Space</th>
          <th>Vehicle Id</th>
          <th>Availability</th>
          <th>Booking date</th>
          <th>Release Date</th>
        </tr>
        ${one}
      </table>
    </div>
  </body>
</html>
`;

  var options = { format: "Letter" };
  pdf
    .create(p, options)
    .toFile(path.join(__dirname, "../public/report.pdf"), function (err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
  res.send(parkingSpace);
});
