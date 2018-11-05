import React from "react";
import PropTypes from "prop-types";

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
              <li key={today.id}>
                {today.class.name}
                {today.startDate}
                {today.endDate}
                {today.availableSpace}
                {today.classSize}
              </li>
            ))}
          </ul>
        )}

        {/* <ul>
          {currentClasses.length === 0 ? (
            <li>No classes for the day</li>
          ) : (
            currentClasses.map(today => (
              <li key={today.id}>
                {today.class.name}
                {today.startDate}
                {today.endDate}
                {today.availableSpace}
                {today.classSize}
              </li>
            ))
          )}
        </ul> */}
      </div>
    </div>
  );
};

ClassViewer.propTypes = {
  datesAndClassSizes: PropTypes.instanceOf(Object).isRequired,
  date: PropTypes.instanceOf(Object).isRequired,
};

export default ClassViewer;
