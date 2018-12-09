import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import DatePicker from "react-datepicker";

const ADD_SESSION = gql`
  mutation(
    $startTime: DateTime!
    $endTime: DateTime!
    $maxSizeOfClass: Int!
    $courseId: ID
    $teacherId: ID
  ) {
    createSession(
      data: {
        startTime: $startTime
        endTime: $endTime
        maxSizeOfClass: $maxSizeOfClass
        status: PUBLISHED
        teacher: { connect: { id: $teacherId } }
        course: { connect: { id: $courseId } }
      }
    ) {
      startTime
      endTime
    }
  }
`;

class CreateSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherId: "",
      courseId: "",
      endTime: new Date(),
      startTime: new Date(),
      maxSizeOfClass: 0,
      date: new Date(),
    };
    this.handleDate = this.handleDate.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  poop() {
    console.log("final state", this.state);
  }

  handleDate(date, stuff) {
    console.log(stuff);
    this.setState({
      [stuff]: date,
    });
  }

  render() {
    const {
      startTime,
      endTime,
      maxSizeOfClass,
      teacherId,
      courseId,
    } = this.state;
    return (
      <Mutation mutation={ADD_SESSION}>
        {createSession => (
          <div>
            <h2>Create Session</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.poop();
                createSession({
                  variables: {
                    startTime,
                    endTime,
                    teacherId,
                    courseId,
                    maxSizeOfClass,
                  },
                });
              }}
            >
              <select onChange={this.handleChange} name="courseId">
                <option value={-1}>Select Course</option>
                {this.props.teacherCourses.courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <select onChange={this.handleChange} name="teacherId">
                <option value={-1}>Select Teacher</option>
                {this.props.teacherCourses.teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {`${teacher.firstName} 
                  ${teacher.lastName}`}
                  </option>
                ))}
              </select>
              <DatePicker
                selected={startTime}
                onChange={date => this.handleDate(date, "startTime")}
              />
              <DatePicker
                selected={endTime}
                onChange={date => this.handleDate(date, "endTime")}
              />
              <input
                required
                title="Max Class Size"
                type="number"
                placeholder="class Size"
                value={maxSizeOfClass}
                onChange={this.handleChange}
                name="maxSizeOfClass"
              />
              <button type="submit">Add Session</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateSession;
