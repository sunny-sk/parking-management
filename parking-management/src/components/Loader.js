import React from "react";

const Loader = ({ className }) => {
  return (
    <>
      <div className="text-center">
        <div className={className}></div>
      </div>
    </>
  );
};

export default Loader;
