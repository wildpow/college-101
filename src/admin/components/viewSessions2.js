import React from "react";
import DatePicker from "react-datepicker";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import View from "./view";

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
      }
      teacher {
        firstName
        lastName
      }
      attendance {
        status
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
    return (
      <div>
        <DatePicker
          inline={true}
          selected={date}
          onChange={this.handleChange}
        />
        <Query query={getSessions} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) return <h1>Error</h1>;
            if (data) return <View data={data} date={date} />;
            return null;
          }}
        </Query>
      </div>
    );
  }
}

export default ViewSessions2;
