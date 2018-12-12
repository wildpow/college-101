import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ALL_STUDENTS = gql`
  query allStudents {
    students {
      firstName
      lastName
      id
      attendance {
        createdAt
        createdbyuser
        session {
          id
        }
      }
      adminNotes
      sessions {
        id
        course {
          name
        }
      }
      receipts {
        createdAt
      }
    }
  }
`;
const QueryStudents = props => (
  <Query query={ALL_STUDENTS}>
    {({ loading, error, data }) => {
      if (loading) return <h1>loading</h1>;
      if (error) return <h1>Error</h1>;
      if (data) return <props.component data={data} />;
      return null;
    }}
  </Query>
);

export default QueryStudents;