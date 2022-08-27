
import React from "react";


const Report = (data) => {
  return data.map((row) => (
    <div key={row.date}>
      <div>{`${row.date}: ${row.visits} visits`}</div>
    </div>
  ));
};

export default Report;
