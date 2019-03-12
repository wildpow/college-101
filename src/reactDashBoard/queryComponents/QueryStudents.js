import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import Spinner from "../components/loading";

const ALL_STUDENTS = gql`
  query allStudents {
    students {
      firstName
      lastName
      id
    }
  }
`;
const QueryStudents = props => (
  <Query query={ALL_STUDENTS}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return <h1>Error</h1>;
      if (data) return <props.component data={data} {...props} />;
      return null;
    }}
  </Query>
);

export default QueryStudents;
