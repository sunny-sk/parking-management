import React from "react";
import Base from "../components/Base";

const Dashboard = (props) => {
  return (
    <>
      <Base {...props}>
        <div className="container">
          <div className="alert alert-danger" role="alert">
            This is a danger alert—check it out!
          </div>
          <div>
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
        <div className="container">
          <div>
            <form>
              <div className="form-group row">
                <label className="mt-1">Filter</label>
                <div className="col-sm-3">
                  <select class="form-control">
                    <option>All</option>
                    <option>A01</option>
                    <option>B01</option>
                    <option>C01</option>
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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>A01</td>
                <td>
                  <span className="badge badge-success p-2">Occupied</span>
                </td>
                <td>12345</td>
                <td>
                  <button className="btn btn-danger btn-sm">
                    Release Parking &nbsp; <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>B01</td>
                <td>
                  <span className="badge badge-secondary p-2">Vacent</span>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>C01</td>
                <td>Vacant</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Base>
    </>
  );
};

export default Dashboard;
