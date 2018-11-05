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
          {date.toDateString()}
          <ClassViewer
            datesAndClassSizes={data.gcms.datesAndClassSizes}
            date={date}
          />
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

Schedule.propTypes = {
  // datesAndClassSizes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default Schedule;
