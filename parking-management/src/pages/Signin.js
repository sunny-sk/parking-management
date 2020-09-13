import React, { useState } from "react";
import Base from "../components/Base";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signinUser, authenticate } from "../helper/Api";
const Signin = ({ location, ...props }) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userType: "Booking_Counter_Agent",
    password: "booking@123",
    email: "bookingagent@gmail.com",
  });
  const { userType, password, email } = formData;

  const displayError = (message, time = 2000) => {
    setTimeout(() => {
      setError("");
    }, time);
    setError(message);
  };

  const onChangeData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const payLoad = { userType, password, email };
      setisLoading(true);
      const response = await signinUser(payLoad);
      setisLoading(false);
      console.log(response);
      if (response.success) {
        authenticate(response.user, () => {
          props.history.replace("/dashboard");
        });
      } else {
        if (response.code === 404) {
          displayError(
            "Invalid email address or password, Please check again "
          );
        }
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong try again later");
    }
  };
  return (
    <>
      {isAuthenticated() ? <Redirect to="/dashboard" /> : null}
      <Base>
        <div className="container">
          <div className="text-center">
            <h3 className="lead text-lg">Parking Management</h3>
          </div>
          <br />
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
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
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">
                    Select User Type
                  </label>
                  <select
                    name="userType"
                    value={userType}
                    onChange={(e) => onChangeData(e)}
                    className="form-control"
                  >
                    <option value="Booking_Counter_Agent">
                      Booking Counter Agent
                    </option>
                    <option value="Parking_Zone_Assistant">
                      Parking Zone Assistant
                    </option>
                  </select>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputPassword1">Enter Email</label>
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => onChangeData(e)}
                    required
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    name="password"
                    minLength="5"
                    value={password}
                    onChange={(e) => onChangeData(e)}
                    required
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                {!isLoading ? (
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Sign in
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="lds-dual-ring"></div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};

export default Signin;
