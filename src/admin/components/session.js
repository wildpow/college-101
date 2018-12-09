import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CreateSession from "./createSession";

const allTeachersCourses = gql`
  query all_Teachers_Courses {
    courses {
      name
      id
    }
    teachers(where: { teachersStatus: Active }) {
      firstName
      lastName
      id
    }
  }
`;

const Session = () => (
  <Query query={allTeachersCourses}>
    {({ loading, error, data }) => {
      if (loading) return <h1>Loading</h1>;
      if (error) return <h1>Error</h1>;
      if (data) return <CreateSession teacherCourses={data} />;
      return null;
    }}
  </Query>
);

export default Session;
