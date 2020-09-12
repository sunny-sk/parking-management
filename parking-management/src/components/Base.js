import React from "react";
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div>
      <Menu />
      <br />
      {children}
    </div>
  );
};

export default Base;
