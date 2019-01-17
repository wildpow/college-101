import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const ADD_ATTENDANCE = gql`
  mutation(
    $sessionId: ID
    $userName: String
    $students: [StudentWhereUniqueInput!]
    $extraStudents: [String!]
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
  constructor(props) {
    super(props);
    this.state = {
      presentStudents: [],
      extraStudents: [],
      notes: "",
    };
    this.handleStudent = this.handleStudent.bind(this);
  }

  handleStudent(e) {
    const presentStudents = this.state.presentStudents;
    const enrolledStudents = this.props.session.students.map(
      student => student.id,
    );
    // const userNameArray = data.teachers.map(el => el.userName);
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
    console.log("event", e);
    console.log("present students", this.state.presentStudents);
    console.log("enrolled students", enrolledStudents);
    console.log(present);
  }

  render() {
    const { teacher, session } = this.props;
    return (
      <>
        <Mutation mutation={ADD_ATTENDANCE}>
          {createAttendance => (
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
            >
              {session.students.length === 0 ? (
                <h1>No students are enrolled in this class</h1>
              ) : (
                <ul>
                  {session.students.map(student => {
                    return (
                      <li key={student.id}>
                        <input
                          type="checkbox"
                          onChange={this.handleStudent}
                          value={student.id}
                        />
                        {`${student.firstName} ${student.lastName}`}
                      </li>
                    );
                  })}
                </ul>
              )}
            </form>
          )}
        </Mutation>
        {console.log("present students", this.state.presentStudents)}
      </>
    );
  }
}
export default CreateAttendance;
