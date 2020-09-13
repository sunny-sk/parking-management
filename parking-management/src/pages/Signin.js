import React, { useState } from "react";
import Base from "../components/Base";

const Signin = ({ location }) => {
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    userType: "",
    password: "",
  });

  const { userType, password } = formData;

  return (
    <>
      <Base>
        <div className="container">
          <div className="text-center">
            <h3 className="lead text-lg">Parking Management</h3>
          </div>
          <br />
          <br />
          <div className="alert alert-danger" role="alert">
            This is a danger alert—check it out!
          </div>
          <div className="row">
            <div className="col-sm-8 p-5 text-center">
              <div style={{ width: "80%" }}>
                <img
                  src={require("../assets/parking.svg")}
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="col-sm-4">
              <br />
              <form>
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">
                    Select User Type
                  </label>
                  <select className="form-control">
                    <option>Booking Counter Agent</option>
                    <option>Parking Zone Assistant</option>
                  </select>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <button className="btn btn-primary">Sign in</button>
                <div className="lds-dual-ring"></div>
              </form>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};

export default Signin;
