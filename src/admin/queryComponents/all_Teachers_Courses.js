import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import CreateSession from "./createSession";

const allTeachersCourses = gql`
  query all_Teachers_Courses {
    teachers(where: { teachersStatus: Active }) {
      firstName
      lastName
      id
    }
    courses {
      name
      id
    }
  }
`;

const QueryTeacherCourse = props => (
  <Query query={allTeachersCourses} pollInterval={1000}>
    {({ loading, error, data }) => {
      if (loading) return <h1>Loading</h1>;
      if (error) return <h1>Error</h1>;
      if (data) return <props.component data={data} />;
      return null;
    }}
  </Query>
);

export default QueryTeacherCourse;
