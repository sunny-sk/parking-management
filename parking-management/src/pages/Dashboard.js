import React, { useState, useEffect } from "react";
import Base from "../components/Base";
import {
  isAuthenticated,
  getAllParkingSpaces,
  releaseParking,
} from "../helper/Api";
import { filterData } from "../helper/Utils";
import TableRow from "../components/TableRow";
const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [filteredParkingSpaces, setFilterdParkingSpaces] = useState([]);
  const displayError = (message, time = 2000) => {
    setTimeout(() => {
      setError("");
    }, time);
    setError(message);
  };

  const onFilter = (filter) => {
    let newFilterData = filterData(parkingSpaces, filter);
    setFilterdParkingSpaces([...newFilterData]);
  };

  const load = async () => {
    try {
      setIsLoading(true);
      const response = await getAllParkingSpaces();
      setIsLoading(false);
      if (response.success) {
        const { parkingSpace } = response;

        setParkingSpaces([...parkingSpace]);
        setFilterdParkingSpaces([...parkingSpace]);
      }
    } catch (error) {}
  };

  const onReleaseParking = async (data) => {
    try {
      console.log(data);
      const response = await releaseParking(data.parked_vehicle[0]._id);
      if (response.success) {
        load();
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Base {...props}>
        <div className="container">
          <div>
            {isAuthenticated().userType === "Booking_Counter_Agent" && (
              <div style={{ display: "inline-block" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    props.history.push("/dashboard/book-parking");
                  }}
                >
                  Book Parking &nbsp; <i className="fas fa-parking"></i>
                </button>
              </div>
            )}
            <div style={{ display: "inline-block", float: "right" }}>
              <div className="lds-dual-ring  lds-dual-ring-loader"></div>
              <button className="btn btn-primary ">
                Downlaod Report &nbsp; <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
          <br />
        </div>
        <br />
        <hr />

        {isLoading ? (
          <>
            <div className="container">
              <br />
              <br />
              <div className="text-center">
                <div className="text-center">
                  <div className="lds-dual-ring"></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container">
              <div>
                <form>
                  <div className="form-group row">
                    <label className="mt-1">Filter</label>
                    <div className="col-sm-3">
                      <select
                        onChange={(e) => {
                          onFilter(e.target.value);
                        }}
                        className="form-control"
                      >
                        <option value="all">All Zones</option>
                        <option value="A">Zone A</option>
                        <option value="B">Zone B</option>
                        <option value="C">Zone C</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">So. No.</th>
                    <th scope="col">PS Title</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Vehicle</th>
                    <th scope="col">Booking Date & Time </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParkingSpaces.map((e, index) => {
                    return (
                      <TableRow
                        data={e}
                        index={index}
                        onClick={onReleaseParking}
                        key={index}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Base>
    </>
  );
};

export default Dashboard;
