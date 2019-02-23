import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../Global_components/loading";

const ALL_SESSIONS = gql`
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
const QuerySessions = props => (
  <Query query={ALL_SESSIONS} pollInterval={1000}>
    {({ loading, error, data: { sessions } }) => {
      if (loading) return <Spinner />;
      if (error) return <h1>Error</h1>;
      if (sessions) return <props.component sessions={sessions} {...props} />;
      return null;
    }}
  </Query>
);

export default QuerySessions;
