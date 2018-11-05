import React from "react";
import PropTypes from "prop-types";
import SingleClass from "./singleClass";

const ClassViewer = props => {
  const { datesAndClassSizes, date } = props;
  const currentClasses = [];
  datesAndClassSizes.map(classDates => {
    const testDate = new Date(classDates.startDate);
    if (
      date.getMonth() === testDate.getMonth() &&
      date.getDate() === testDate.getDate() &&
      date.getFullYear() === testDate.getFullYear()
    ) {
      return currentClasses.push(classDates);
    }
    return null;
  });
  return (
    <div>
      <h1>
        Current Classes for
        <br />
        {date.toDateString()}
      </h1>
      <div>
        {currentClasses.length === 0 ? (
          <h2>No classes for the day</h2>
        ) : (
          <ul>
            {currentClasses.map(today => (
              <SingleClass today={today} key={today.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

ClassViewer.propTypes = {
  datesAndClassSizes: PropTypes.instanceOf(Object).isRequired,
  date: PropTypes.instanceOf(Object).isRequired,
};

export default ClassViewer;
