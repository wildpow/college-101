import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { AddCircle, ScheduleNew, Trash } from "grommet-icons";
import LayerHeader from "../../admin/components/sharedComponents/layerHeader";
import { TEACHER } from "../../../queryComponents/QueryTeacher";

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
    $notes: AttendanceCreatenotesInput
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

class TakeAttendance extends React.Component {
  static propTypes = {
    eventTimer: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    teacher: PropTypes.string.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      presentStudents: [],
      extraStudentsArr: [],
      notes: [],
      inputExtraStudents: "",
      layer: false,
    };
  }

  handleStudent = e => {
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
  };

  handleExtraStudents = e => {
    this.setState({
      inputExtraStudents: e.target.value,
    });
  };

  submitExtraStudent = () => {
    const { inputExtraStudents, extraStudentsArr } = this.state;
    const extraArr = extraStudentsArr.map(i => i);
    extraArr.push(inputExtraStudents);
    this.setState({
      extraStudentsArr: extraArr,
      inputExtraStudents: "",
    });
  };

  removeExtra = e => {
    const { extraStudentsArr } = this.state;
    const extraArrCopy = extraStudentsArr.map(i => i);
    extraArrCopy.splice(e.target.value, 1);
    this.setState({
      extraStudentsArr: extraArrCopy,
    });
  };

  layerToggle = changeAction => {
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        layer: false,
      });
    }
  };

  render() {
    const {
      layer,
      presentStudents,
      notes,
      extraStudentsArr,
      inputExtraStudents,
    } = this.state;
    const { session, teacher, eventTimer, setMessage } = this.props;
    return (
      <>
        <Button
          icon={<AddCircle />}
          label={<Text truncate>Take Attendance</Text>}
          onClick={() => this.layerToggle(true)}
        />
        {layer && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={() => this.layerToggle(false)}
            onEsc={() => this.layerToggle(false)}
          >
            <LayerHeader
              headingText="Take Attendance"
              modelFunc={this.layerToggle}
            />
            <Mutation
              mutation={ADD_ATTENDANCE}
              refetchQueries={() => {
                return [
                  {
                    query: TEACHER,
                    variables: { userName: teacher },
                  },
                ];
              }}
            >
              {createAttendance => (
                <Box
                  gap="small"
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  pad="medium"
                  as="form"
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
                    this.layerToggle(false);
                    eventTimer(true);
                    setMessage("Attendance taken");
                    return null;
                  }}
                >
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
                            <td>
                              {`${student.firstName} ${student.lastName}`}
                            </td>
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
                </Box>
              )}
            </Mutation>
          </Layer>
        )}
      </>
    );
  }
}

export default TakeAttendance;
