const BASE_URL = "http://localhost:8100/api/v1";

//All Calling Urls

export default {
  _signin: BASE_URL + "/auth/signin",
  _initApp: BASE_URL + "/common/initalizeApp",
  _getAllParkingSpaces: BASE_URL + "/common/getAllParkingSpaces",
  _bookNewParking: BASE_URL + "/common/book-new-parking",
  _releaseParking: BASE_URL + "/common/release-parking/",
  _getReport: BASE_URL + "/common/getReport",
  _reportUrl: "http://localhost:8100/report.pdf",
};
