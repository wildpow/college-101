import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ALL_STUDENTS = gql`
  query allStudents {
    students: students {
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
    {({ loading, error, data: { students } }) => {
      if (loading) return <h1>loading</h1>;
      if (error) return <h1>Error</h1>;
      if (students) return <props.component students={students} />;
      return null;
    }}
  </Query>
);

export default QueryStudents;
