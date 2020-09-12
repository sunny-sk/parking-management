import React from "react";
import Menu from "../components/Menu";
import Base from "../components/Base";

const Initialize = (props) => {
  return (
    <>
      <Base {...props}>
        <div className="container">
          <div className="text-center">
            <div className="lds-dual-ring"></div>
          </div>
          <div className="text-center">
            <button className="btn btn-outline-dark">Initialize Data</button>
          </div>
        </div>
      </Base>
    </>
  );
};

export default Initialize;
