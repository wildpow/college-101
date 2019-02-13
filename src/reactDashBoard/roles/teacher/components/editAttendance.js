import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button } from "../../../components/sharedStyles";

const NewButton = styled(Button)`
  margin-top: 5px;
`;
const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;

  /* max-width: 800px; */
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

class EditAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presentStudents: [],
      extraStudentsArr: [],
      notes: "",
      inputExtraStudents: "",
      extra: [],
    };
    this.handleExtraStudents = this.handleExtraStudents.bind(this);
    this.submitExtraStudent = this.submitExtraStudent.bind(this);
    this.removeExtra = this.removeExtra.bind(this);
  }

  componentWillMount() {
    const { session } = this.props;
    const present = [];
    const enrolled = [];

    session.attendance.students.map(student => {
      present.push(student);
    });
    session.students.map(student => {
      enrolled.push(student);
    });
    this.setState({
      presentStudents: present,
      enrolledStudents: enrolled,
      notes: session.attendance.notes,
      extraStudentsArr: session.attendance.extraStudents,
    });
  }

  removeExtra(e) {
    const { extraStudentsArr } = this.state;
    const extraArrCopy = extraStudentsArr.map(i => i);
    extraArrCopy.splice(e.target.value, 1);
    this.setState({
      extraStudentsArr: extraArrCopy,
    });
  }

  submitExtraStudent() {
    const extraStudents = this.state.inputExtraStudents;
    const extraArr = this.state.extraStudentsArr;
    extraArr.push(extraStudents);
    this.setState({
      extraStudentsArr: extraArr,
      inputExtraStudents: "",
    });
  }

  handleExtraStudents(e) {
    this.setState({
      inputExtraStudents: e.target.value,
    });
  }

  render() {
    const { inputExtraStudents, extraStudentsArr } = this.state;
    const { session } = this.props;
    return (
      <div>
        {console.log("!!!!", this.state)}
        <h1>Edit Attendance</h1>
        <div>
          <h3>Extra Students?</h3>
          <input
            type="text"
            placeholder="enter first and last name"
            value={inputExtraStudents}
            onChange={this.handleExtraStudents}
          />
          {inputExtraStudents.length === 0 ? (
            <button disabled type="button" onClick={this.handleExtraStudents}>
              add
            </button>
          ) : (
            <button type="button" onClick={this.submitExtraStudent}>
              add
            </button>
          )}
          <ul>
            {extraStudentsArr.map((student, index) => {
              const count = index;
              return (
                <>
                  <li key={count}>
                    {student}
                    <button
                      value={count}
                      onClick={this.removeExtra}
                      type="button"
                    >
                      remove
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default EditAttendance;
