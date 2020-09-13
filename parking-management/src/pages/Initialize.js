import React, { useState } from "react";
import Base from "../components/Base";
import { initApp } from "../helper/Api";

const Initialize = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const displayAlert = (message, time = 2000, type = "error") => {
    setTimeout(() => {
      if (type === "success") setSuccess("");
      else setError("");
    }, time);
    if (type === "success") setSuccess(message);
    else setError(message);
  };

  const initialize = async () => {
    try {
      setIsLoading(true);
      const response = await initApp();
      setIsLoading(false);
      if (response.success) {
        displayAlert("App Initialize successfully", 3000, "success");
      } else {
        displayAlert(response.message, 3000, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Base {...props}>
        <div className="container">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          {isLoading ? (
            <div className="text-center">
              <div className="lds-dual-ring"></div>
            </div>
          ) : (
            <div className="text-center">
              <br />
              <button onClick={initialize} className="btn btn-outline-dark">
                Initialize Data
              </button>
            </div>
          )}
        </div>
      </Base>
    </>
  );
};

export default Initialize;
