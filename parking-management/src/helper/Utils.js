// helper function

//to get converted date
export const getDate = (data) => {
  return new Date(data.parked_vehicle[0].booking_date_time).toLocaleString();
};

//filter data
export const filterData = (originalData, filter) => {
  let temp = [...originalData];
  let newFilterdData;
  if (filter === "all") {
    return temp;
  } else {
    newFilterdData = temp.filter(
      (e) => e.parking_zone_id.parking_zone_title === filter
    );
    return newFilterdData;
  }
};
