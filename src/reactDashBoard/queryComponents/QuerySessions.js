import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../Global_components/loading";

export const ALL_SESSIONS = gql`
  query allSessions {
    sessions(orderBy: startTime_ASC) {
      id
      startTime
      endTime
      maxSizeOfClass
      enrolled

      attendance {
        status
        id
        extraStudents
        notes
        students {
          firstName
          lastName
        }
      }

      receipts {
        student {
          firstName
          lastName
          id
          receipts {
            id
          }
          attendance {
            id
          }
        }
        id
        email
      }
      course {
        name
        id
      }
      teacher {
        firstName
        lastName
        id
      }

      students {
        firstName
        lastName
        id
        receipts {
          id
        }
        attendance {
          id
        }
      }
    }
  }
`;
const QuerySessions = props => (
  <Query query={ALL_SESSIONS}>
    {({ loading, error, data: { sessions } }) => {
      if (loading) return <Spinner />;
      if (error) return <h1>Error</h1>;
      if (sessions) return <props.component sessions={sessions} {...props} />;
      return null;
    }}
  </Query>
);

export default QuerySessions;
