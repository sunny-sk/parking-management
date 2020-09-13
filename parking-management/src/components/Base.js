import React from "react";
import Menu from "./Menu";

// HOC for all components

const Base = ({ children, ...props }) => {
  return (
    <div>
      <Menu {...props} />
      <br />
      {children}
    </div>
  );
};

export default Base;
