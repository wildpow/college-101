import React from "react";
import PropTypes from "prop-types";
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
    const { data } = this.props;
    return (
      <Layout>
        <div>
          <Calendar onChange={this.changeDate} value={date} />
          <ClassViewer graphData={data.gcms} date={date} />
        </div>
      </Layout>
    );
  }
}

export const ScheduleGraph = graphql`
  query ScheduleGraph {
    gcms {
      dateSizes {
        id
        startDate
        endDate
        enrolled
        classSize
        class {
          id
          name
          descriptionOfClass
        }
      }
    }
  }
`;

Schedule.propTypes = {
  // datesAndClassSizes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Schedule;
