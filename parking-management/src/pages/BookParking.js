import React, { useState } from "react";
import Base from "../components/Base";

const BookParking = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Base>
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Vehicle Id</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Vehicle Id"
              />
            </div>
            <label>Available Parking zones</label>
            <div className="border rounded p-2">
              <div>
                <p className="m-0">Parking Zone : A</p>
                {[1, 2, 3, 4].map((data, index) => {
                  return <div className="parking-slot ">{data}</div>;
                })}
              </div>
              <div>
                <div>
                  <p className="m-0">Parking Zone : B</p>
                  {[1, 2, 3, 4].map((data, index) => {
                    return <div className="parking-slot">{data}</div>;
                  })}
                </div>
              </div>
              <div>
                <div>
                  <p className="m-0">Parking Zone : C</p>
                  {[1, 2, 3, 4].map((data, index) => {
                    return <div className="parking-slot">{data}</div>;
                  })}
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="text-center">
              <div className="lds-dual-ring"></div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Book
              </button>
              <button type="submit" className="btn btn-danger ml-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Base>
    </>
  );
};

export default BookParking;
