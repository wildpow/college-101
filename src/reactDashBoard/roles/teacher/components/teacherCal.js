import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import ClassView from "./classView";

class TeacherCal extends React.Component {
  static propTypes = {
    teacher: PropTypes.instanceOf(Object).isRequired,
    sessions: PropTypes.instanceOf(Object).isRequired,
  };

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
    const { sessions, teacher } = this.props;
    return (
      <>
        <DatePicker selected={date} onChange={this.handleChange} />
        <ClassView date={date} sessions={sessions} teacher={teacher} />
      </>
    );
  }
}

export default TeacherCal;
