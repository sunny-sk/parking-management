import React, { useState } from "react";
import Base from "../components/Base";
import { Redirect } from "react-router-dom";
// importing api methods
import { isAuthenticated, signinUser, authenticate } from "../helper/Api";
import Loader from "../components/Loader";
import Input from "../components/Input";
const Signin = ({ location, ...props }) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userType: "Booking_Counter_Agent",
    password: "",
    email: "",
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
        } else {
          displayError(response.message);
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
                  alt="parking logo"
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
                <Input
                  title={"Enter Email"}
                  name="email"
                  value={email}
                  onChange={(e) => onChangeData(e)}
                  required={true}
                  type="email"
                  placeholder="Enter Email"
                  info=" We'll never share your email with anyone else."
                />
                <Input
                  title="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChangeData(e)}
                  required={true}
                  type="password"
                  minLength="5"
                  placeholder="Password"
                />

                {!isLoading ? (
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Sign in
                    </button>
                  </div>
                ) : (
                  <Loader className="lds-dual-ring" />
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
