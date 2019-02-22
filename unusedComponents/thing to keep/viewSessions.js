import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import View from "./view";
import QuerySessions from "../queryComponents/all_sessions";

const Container = styled.div`
  display: flex;
`;

class ViewSessions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      date,
    });
  }

  render() {
    const { date } = this.state;
    const { courseId, teacherId } = this.props;
    return (
      <Container>
        <DatePicker
          inline={true}
          selected={date}
          onChange={this.handleChange}
        />
        <QuerySessions
          component={View}
          date={date}
          courseId={courseId}
          teacherId={teacherId}
        />
      </Container>
    );
  }
}

export default ViewSessions;
