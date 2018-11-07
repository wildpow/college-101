import React from "react";
// import { Query } from "react-apollo";
// import { gql } from "apollo-boost";
import ClassSize from "./classSize";

const timeFormat = time => {
  const timeObject = new Date(time);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const timeString = timeObject.toLocaleString("en-US", options);
  return timeString;
};

const SingleClass = props => {
  const { today } = props;
  return (
    <>
      <li>
        {today.class.name}
        <br />
        Start Time:
        {timeFormat(today.startDate)}
        <br />
        End Time:
        {timeFormat(today.endDate)}
        <br />
        Current Enrollment:
        <div style={{ display: "flex" }}>
          <ClassSize
            id={today.id}
            displayVar={today.enrolled}
            extraVar={today.classSize}
            available
          />
          {"/"}
          <ClassSize
            id={today.id}
            displayVar={today.classSize}
            extraVar={today.enrolled}
            available={false}
          />
        </div>
      </li>
    </>
  );
};

export default SingleClass;
