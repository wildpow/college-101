import React from "react";
import Calendar from "react-calendar";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import ClassViewer from "../components/classView";
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
    const { datesAndClassSizes } = this.props.data.gcms;
    return (
      <Layout>
        {console.log(date)}
        <div>
          <Calendar onChange={this.changeDate} value={date} />
          {date.toDateString()}
          <ClassViewer datesAndClassSizes={datesAndClassSizes} date={date} />
        </div>
      </Layout>
    );
  }
}

export const ScheduleGraph = graphql`
  query ScheduleGraph {
    gcms {
      datesAndClassSizes {
        id
        startDate
        endDate
        availableSpace
        classSize
        class {
          name
          id
          descriptionOfClass
        }
      }
    }
  }
`;

export default Schedule;
