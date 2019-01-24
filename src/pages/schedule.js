import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Wrapper, CalContainer, CalStyled } from "../styles/sheduleStyles";
import Layout from "../gatsbyComponents/layout";
import ClassViewer from "../gatsbyComponents/schedule/classView";

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
        <Wrapper>
          <CalContainer>
            <CalStyled onChange={this.changeDate} value={date} />
          </CalContainer>
          <ClassViewer graphData={data.gcms} date={date} />
        </Wrapper>
      </Layout>
    );
  }
}

export const ScheduleGraph = graphql`
  query ScheduleGraph {
    gcms {
      sessions {
        id
        startTime
        endTime
        enrolled
        maxSizeOfClass
        course {
          id
          name
          description
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
