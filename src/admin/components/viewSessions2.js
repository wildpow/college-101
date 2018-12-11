import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import View from "./view";

const Container = styled.div`
  display: flex;
`;
const getSessions = gql`
  query allSessions {
    sessions(orderBy: startTime_ASC) {
      id
      startTime
      endTime
      maxSizeOfClass
      enrolled
      course {
        name
        id
      }
      teacher {
        firstName
        lastName
        id
      }
      attendance {
        status
        id
      }
      students {
        firstName
        lastName
        id
      }
    }
  }
`;

class ViewSessions2 extends React.Component {
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
        <Query query={getSessions} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) return <h1>Error</h1>;
            if (data)
              return (
                <View
                  data={data}
                  date={date}
                  courseId={courseId}
                  teacherId={teacherId}
                />
              );
            return null;
          }}
        </Query>
      </Container>
    );
  }
}

export default ViewSessions2;
