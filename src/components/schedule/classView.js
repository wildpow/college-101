import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import SingleClass from "./singleClass";

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;

  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  & th,
  td {
    padding: 15px;
    text-align: left;
  }
  th {
    background-color: black;
    color: white;
  }
  tr:nth-child(even) {
    background-color: #eee !important;
  }
  tr:nth-child(odd) {
    background-color: #fff !important;
  }
`;
const ClassViewer = props => {
  const { graphData, date } = props;
  const currentClasses = [];
  graphData.dateSizes.map(classDates => {
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
      <h1>{`Current Classes for ${date.toDateString()}`}</h1>
      <div>
        {currentClasses.length === 0 ? (
          <h2>No classes for the day</h2>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Enrollment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentClasses.map(today => (
                <SingleClass today={today} key={today.id} />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

ClassViewer.propTypes = {
  graphData: PropTypes.instanceOf(Object).isRequired,
  date: PropTypes.instanceOf(Object).isRequired,
};

export default ClassViewer;
