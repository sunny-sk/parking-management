import React from "react";
import { getDate } from "../helper/Utils";
import { isAuthenticated } from "../helper/Api";
const TableRow = ({ data, onClick, index }) => {
  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{data.parking_space_title}</td>
        <td>
          {data.parked_vehicle.length > 0 ? (
            <span className="badge badge-success p-2">Occupied</span>
          ) : (
            <span className="badge badge-secondary p-2">Vacent</span>
          )}
        </td>
        <td>
          {data.parked_vehicle.length > 0
            ? data.parked_vehicle[0].vehicle_registration_number
            : "-"}
        </td>
        <td>{data.parked_vehicle.length > 0 ? <p>{getDate(data)}</p> : "-"}</td>
        <td>
          {isAuthenticated().userType === "Booking_Counter_Agent" ? (
            <>
              {data.parked_vehicle.length > 0 ? (
                <button
                  onClick={() => {
                    onClick(data);
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Release Parking &nbsp; <i className="fas fa-trash-alt"></i>
                </button>
              ) : (
                "-"
              )}
            </>
          ) : null}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
