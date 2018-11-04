import React from "react";
import Calendar from "react-calendar";
import { graphql } from "gatsby";
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
    const { classes } = this.props.data.gcms;
    return (
      <Layout>
        {console.log(classes)}
        <div>
          <Calendar onChange={this.changeDate} value={date} />
          {date.toDateString()}
        </div>
      </Layout>
    );
  }
}

export const ScheduleGraph = graphql`
  query ScheduleGraph {
    gcms {
      classes {
        id
        name
        descriptionOfClass
        datesAndClassSizes {
          id
          startDate
          endDate
          classSize
          availableSpace
        }
      }
    }
  }
`;

export default Schedule;
