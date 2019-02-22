import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button } from "../../../Global_components/sharedStyles";

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

const ADD_ATTENDANCE = gql`
  mutation(
    $sessionId: ID
    $userName: String
    $students: [StudentWhereUniqueInput!]
    $extraStudents: AttendanceCreateextraStudentsInput
    $notes: String!
  ) {
    createAttendance(
      data: {
        session: { connect: { id: $sessionId } }
        createdByUser: { connect: { userName: $userName } }
        status: PUBLISHED
        students: { connect: $students }
        extraStudents: $extraStudents
        notes: $notes
      }
    ) {
      id
    }
  }
`;

class CreateAttendance extends React.Component {
  static propTypes = {
    teacher: PropTypes.instanceOf(Object).isRequired,
    session: PropTypes.instanceOf(Object).isRequired,
    handleFlip: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      presentStudents: [],
      extraStudentsArr: [],
      notes: "",
      inputExtraStudents: "",
    };
    this.handleStudent = this.handleStudent.bind(this);
    this.handleExtraStudents = this.handleExtraStudents.bind(this);
    this.submitExtraStudent = this.submitExtraStudent.bind(this);
    this.removeExtra = this.removeExtra.bind(this);
  }

  handleStudent(e) {
    const { presentStudents } = this.state;
    const present = presentStudents.includes(e.target.value);
    if (present === false) {
      const updateStudent = presentStudents;
      updateStudent.push(e.target.value);
      this.setState({
        presentStudents: updateStudent,
      });
    } else {
      const updateStudent = presentStudents.filter(
        student => student !== e.target.value,
      );
      this.setState({
        presentStudents: updateStudent,
      });
    }
  }

  handleExtraStudents(e) {
    this.setState({
      inputExtraStudents: e.target.value,
    });
  }

  submitExtraStudent() {
    const { inputExtraStudents, extraStudentsArr } = this.state;
    const extraArr = extraStudentsArr.map(i => i);
    extraArr.push(inputExtraStudents);
    this.setState({
      extraStudentsArr: extraArr,
      inputExtraStudents: "",
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

  render() {
    const { teacher, session, handleFlip } = this.props;
    const {
      presentStudents,
      notes,
      extraStudentsArr,
      inputExtraStudents,
    } = this.state;
    return (
      <>
        <Mutation mutation={ADD_ATTENDANCE}>
          {createAttendance => (
            <form
              onSubmit={e => {
                e.preventDefault();
                const fomatStudents = [];
                presentStudents.map(item => {
                  const itemObj = { id: item };
                  fomatStudents.push(itemObj);
                  return null;
                });
                const formatExtraStudents = {
                  set: extraStudentsArr,
                };
                createAttendance({
                  variables: {
                    sessionId: session.id,
                    userName: teacher,
                    students: fomatStudents,
                    notes,
                    extraStudents: formatExtraStudents,
                  },
                });
                handleFlip();
              }}
            >
              {session.students.length === 0 ? (
                <h1>No students are enrolled in this class</h1>
              ) : (
                <TableWrapper>
                  <Table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Present?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {session.students.map(student => (
                        <tr key={student.id}>
                          <td>{`${student.firstName} ${student.lastName}`}</td>
                          <td>
                            <input
                              type="checkbox"
                              onChange={this.handleStudent}
                              value={student.id}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div>
                    <h3>Extra Students?</h3>
                    <input
                      type="text"
                      placeholder="enter first and last name"
                      value={inputExtraStudents}
                      onChange={this.handleExtraStudents}
                    />
                    {inputExtraStudents.length === 0 ? (
                      <button
                        disabled
                        type="button"
                        onClick={this.handleExtraStudents}
                      >
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
                  <div>
                    <h3>Notes</h3>
                    <textarea />
                  </div>
                  <NewButton type="submit">Save</NewButton>
                </TableWrapper>
              )}
            </form>
          )}
        </Mutation>
      </>
    );
  }
}
export default CreateAttendance;
