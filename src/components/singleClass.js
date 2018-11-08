import React from "react";
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
      <tr>
        <td>{today.class.name}</td>
        <td>{timeFormat(today.startDate)}</td>
        <td>{timeFormat(today.endDate)}</td>
        <td>
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
        </td>
      </tr>
    </>
  );
};

export default SingleClass;
