import React from "react";
import styled from "styled-components";
import ViewSessions from "./viewSessions";

const FilterContainer = styled.div`
  display: flex;
`;
class FilteredCal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courseId: "0",
      teacherId: "0",
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { data } = this.props;
    const { courseId, teacherId } = this.state;
    return (
      <div>
        <FilterContainer>
          Filter by:
          <select onChange={this.handleChange} name="courseId">
            <option value="0">Select Course</option>
            {data.courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <select onChange={this.handleChange} name="teacherId">
            <option value="0">Select Teacher</option>
            <option value="-1">No Teacher</option>
            {data.teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {`${teacher.firstName} 
                  ${teacher.lastName}`}
              </option>
            ))}
          </select>
        </FilterContainer>
        <ViewSessions courseId={courseId} teacherId={teacherId} />
      </div>
    );
  }
}

export default FilteredCal;
