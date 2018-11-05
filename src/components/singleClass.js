import React from "react";

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
    <li>
      {today.class.name}
      <br />
      Start Time:
      {timeFormat(today.startDate)}
      <br />
      End Time:
      {timeFormat(today.endDate)}
    </li>
  );
};

export default SingleClass;
