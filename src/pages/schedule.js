import React from "react";
import Calendar from "react-calendar";
import Layout from "../components/layout";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(date) {
    this.setState({
      date,
    });
  }

  render() {
    const { date } = this.state;
    return (
      <Layout>
        <div>
          <Calendar onChange={this.changeDate} value={date} />
          {date.toDateString()}
        </div>
      </Layout>
    );
  }
}

export default Schedule;
