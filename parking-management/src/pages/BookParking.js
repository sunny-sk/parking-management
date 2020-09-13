import React, { useState, useEffect, Fragment } from "react";
import Base from "../components/Base";
import { getAllParkingSpaces, bookNewParking, logoutUser } from "../helper/Api";
import Loader from "../components/Loader";
import Input from "../components/Input";

const BookParking = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeSpace, setActiveSpace] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState({
    zoneA: [],
    zoneB: [],
    zoneC: [],
  });
  const displayError = (message, time = 2000) => {
    setTimeout(() => {
      setError("");
    }, time);
    setError(message);
  };
  const [formData, setFormData] = useState({
    parkingZoneId: "",
    parkingSpaceId: "",
    vehicleRegistrationNumber: "",
  });
  const { parkingZoneId, parkingSpaceId, vehicleRegistrationNumber } = formData;

  const onChangeData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!vehicleRegistrationNumber)
        return displayError("Please fill vehicle registration number");
      const payLoad = {
        parking_zone_id: parkingZoneId,
        parking_space_id: parkingSpaceId,
        vehicle_registration_number: vehicleRegistrationNumber,
        booking_date_time: new Date().toISOString(),
      };

      console.log(payLoad);
      setIsLoading(true);
      let response = await bookNewParking(payLoad);
      setIsLoading(false);
      console.log(response);
      if (response.success) {
        // load();
        setFormData({
          parkingZoneId: "",
          parkingSpaceId: "",
          vehicleRegistrationNumber: "",
        });
        props.history.goBack();
      } else {
        if (response.code === 401) {
          displayError(response.message);
          logoutUser(() => {
            window.location.href = "/";
          });
        } else {
          displayError(response.message);
        }
      }
    } catch (error) {
      alert("something went wrong, try again later");
    }
  };

  const selectSpace = (space) => {
    setFormData({
      ...formData,
      parkingZoneId: space.parking_zone_id._id,
      parkingSpaceId: space._id,
    });
    setActiveSpace(space.parking_space_title);
  };

  const load = async () => {
    try {
      setIsLoading(true);
      const response = await getAllParkingSpaces();
      if (response.success) {
        const { parkingSpace } = response;
        const temp = {
          zoneA: [],
          zoneB: [],
          zoneC: [],
        };
        parkingSpace.forEach((e, index) => {
          if (e && e.parking_zone_id.parking_zone_title === "A") {
            temp.zoneA.push(e);
          } else if (e && e.parking_zone_id.parking_zone_title === "B") {
            temp.zoneB.push(e);
          } else {
            temp.zoneC.push(e);
          }
        });
        console.log(temp);
        setParkingSpaces({ ...temp });
      }
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = () => {
    props.history.goBack();
  };
  return (
    <>
      <Base>
        <div className="container">
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={(e) => onSubmit(e)}>
            <Input
              title={"Vehicle Id"}
              name="vehicleRegistrationNumber"
              value={vehicleRegistrationNumber}
              onChange={(e) => onChangeData(e)}
              required={true}
              type="text"
              placeholder="Enter Vehicle Registration number"
              info=" We'll never share your email with anyone else."
            />
            <label>Available Parking zones</label>
            <div className="border rounded p-2">
              <div>
                <p className="m-0">
                  <b>Parking Zone : A</b>
                </p>
                {parkingSpaces.zoneA.map((data, index) => {
                  return (
                    <Fragment key={index}>
                      {data.parked_vehicle.length > 0 ? null : (
                        <div
                          key={index}
                          onClick={() => {
                            selectSpace(data);
                          }}
                          className={
                            activeSpace === data.parking_space_title
                              ? "parking-slot selected-slot"
                              : "parking-slot"
                          }
                        >
                          {data.parking_space_title}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
              <div>
                <div>
                  <p className="m-0">
                    <b>Parking Zone : B</b>
                  </p>
                  {parkingSpaces.zoneB.map((data, index) => {
                    return (
                      <Fragment key={index}>
                        {data.parked_vehicle.length > 0 ? null : (
                          <div
                            key={index}
                            onClick={() => {
                              selectSpace(data);
                            }}
                            className={
                              activeSpace === data.parking_space_title
                                ? "parking-slot selected-slot"
                                : "parking-slot"
                            }
                          >
                            {data.parking_space_title}
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
              <div>
                <div>
                  <p className="m-0">
                    <b>Parking Zone : C</b>
                  </p>
                  {parkingSpaces.zoneC.map((data, index) => {
                    return (
                      <Fragment key={index}>
                        {data.parked_vehicle.length > 0 ? null : (
                          <div
                            onClick={() => {
                              selectSpace(data);
                            }}
                            className={
                              activeSpace === data.parking_space_title
                                ? "parking-slot selected-slot"
                                : "parking-slot"
                            }
                          >
                            {data.parking_space_title}
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
            <br />
            <br />
            {isLoading ? (
              <Loader className="lds-dual-ring" />
            ) : (
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Book Parking
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="btn btn-danger ml-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </Base>
    </>
  );
};

export default BookParking;
