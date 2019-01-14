import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.5em 3em;
  border: 0.16em solid green;
  margin-top: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Verdana, sans-serif;
  font-weight: 400;
  color: black;
  text-align: center;
  transition: all 0.15s;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #dddddd;
    border-color: #dddddd;
  }
  &:active {
    color: #bbbbbb;
    border-color: #bbbbbb;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0px 15px 15px 15px;
  height: 100%;
  margin-top: 40px;
  input {
    padding: 10px;
    margin: 5px;
    font-family: Verdana, sans-serif;
  }
`;
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
      teacherId: "-1",
      courseId: "-1",
      endTime: new Date(),
      startTime: new Date(),
      maxSizeOfClass: "",
    };
    this.handleDate = this.handleDate.bind(this);
  }

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value, error: false });

  handleMaxClassSize = e => {
    const classSize = Number(e.target.value);
    this.setState({ maxSizeOfClass: classSize });
  };

  handleDate(date, stateName) {
    this.setState({
      [stateName]: date,
    });
  }

  render() {
    const { data } = this.props;
    const {
      startTime,
      endTime,
      maxSizeOfClass,
      teacherId,
      courseId,
    } = this.state;
    return (
      <>
        {console.log(this.state)}
        <Mutation mutation={ADD_SESSION}>
          {createSession => (
            <div>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  if (teacherId === "-1" && courseId === "-1") {
                    this.setState({
                      error: true,
                      errorMessage:
                        "Teacher and course are required to create a session",
                    });
                  } else if (teacherId === "-1" && courseId !== "-1") {
                    this.setState({
                      error: true,
                      errorMessage: "Teacher is require to create session",
                    });
                  } else if (teacherId !== "-1" && courseId === "-1") {
                    this.setState({
                      error: true,
                      errorMessage: "Course is require to create session",
                    });
                  } else {
                    createSession({
                      variables: {
                        startTime,
                        endTime,
                        teacherId,
                        courseId,
                        maxSizeOfClass,
                      },
                    });
                    this.setState(
                      {
                        teacherid: "-1",
                        courseId: "-1",
                        maxSizeOfClass: "",
                      },
                      this.props.handleFlip(),
                    );
                  }
                }}
              >
                <select onChange={this.handleChange} name="courseId" required>
                  <option value={-1}>Select Course</option>
                  {data.courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <select onChange={this.handleChange} name="teacherId" required>
                  <option value={-1}>Select Teacher</option>
                  {data.teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {`${teacher.firstName} 
                  ${teacher.lastName}`}
                    </option>
                  ))}
                </select>
                <DatePicker
                  selected={startTime}
                  showTimeSelect
                  showDisabledMonthNavigation
                  minDate={new Date()}
                  minTime={setHours(setMinutes(new Date(), 0), 13)}
                  maxTime={setHours(setMinutes(new Date(), 15), 22)}
                  timeCaption="Time"
                  onChange={date => this.handleDate(date, "startTime")}
                  dateFormat="MM/d/YYYY - h:mm aa"
                />
                <DatePicker
                  selected={endTime}
                  showTimeSelect
                  showDisabledMonthNavigation
                  minDate={new Date()}
                  minTime={setHours(setMinutes(new Date(), 0), 13)}
                  maxTime={setHours(setMinutes(new Date(), 15), 22)}
                  timeCaption="Time"
                  onChange={date => this.handleDate(date, "endTime")}
                  dateFormat="MM/d/YYYY - h:mm aa"
                />
                <input
                  required
                  title="Max Class Size"
                  type="number"
                  placeholder="class Size"
                  value={maxSizeOfClass}
                  onChange={this.handleMaxClassSize}
                  name="maxSizeOfClass"
                />
                {this.state.error && this.state.errorMessage}
                <Button type="submit">Add Session</Button>
              </Form>
            </div>
          )}
        </Mutation>
      </>
    );
  }
}

export default CreateSession;
