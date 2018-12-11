import React from "react";
import styled from "styled-components";

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

const ViewStudents = props => {
  const { students } = props;
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Attendance</th>
            <th>Sessions</th>
            <th>Receipts</th>
            <th>Attendance</th>
            <th>Admin Notes</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>
                {student.attendance ? student.attendance.createdbyuser : `none`}
              </td>
              <td>
                {student.sessions.length !== 0
                  ? student.sessions.course.name
                  : `none`}
              </td>
              <td>
                {student.receipts.length !== 0
                  ? student.receipts.createdAt
                  : `none`}
              </td>
              <td>
                {student.attendance ? student.attendance.createdAt : `none`}
              </td>
              <td>{student.adminNotes.length !== 0 ? "here" : `none`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewStudents;
