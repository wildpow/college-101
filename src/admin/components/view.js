import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { timeFormat } from "../../utils/globalFunctions";

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;

  max-width: 800px;
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

const Td = styled.td`
  text-align: center !important;
`;

const View = props => {
  const { sessions, date, courseId, teacherId } = props;
  const currentSessions = [];
  sessions.map(session => {
    const testDate = new Date(session.startTime);
    if (
      date.getMonth() === testDate.getMonth() &&
      date.getDate() === testDate.getDate() &&
      date.getFullYear() === testDate.getFullYear()
    ) {
      if (courseId === "0" && teacherId === "0") {
        currentSessions.push(session);
      }
      if (courseId === session.course.id && teacherId === "0") {
        currentSessions.push(session);
      } else if (
        courseId === session.course.id &&
        teacherId === session.teacher.id
      ) {
        currentSessions.push(session);
      } else if (courseId === "0" && teacherId === session.teacher.id) {
        currentSessions.push(session);
      } else {
        return null;
      }
    }
    return null;
  });
  return (
    <div>
      <h1>{`Current Classes for ${date.toDateString()}`}</h1>
      <div>
        {currentSessions.length === 0 ? (
          <h2>No classes for the day</h2>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Enrollment</th>
                <th>Teacher</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions.map(today => (
                <tr key={today.id}>
                  <td>{today.course ? today.course.name : "No Course"}</td>
                  <td>{timeFormat(today.startTime)}</td>
                  <td>{timeFormat(today.endTime)}</td>
                  <Td>
                    {`${today.students.length === 0 ? 0 : today.students.length}
                    / 
                    ${today.maxSizeOfClass}`}
                  </Td>
                  <td>
                    {/* placeholder for change teacher button */}
                    {today.teacher
                      ? `${today.teacher.firstName} ${today.teacher.lastName}`
                      : "no teacher"}
                  </td>
                  {/* placeholder for take attendance button */}
                  <td>{today.attendance ? "taken" : "none"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

View.propTypes = {
  courseId: PropTypes.string.isRequired,
  teacherId: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Object).isRequired,
};

export default View;
