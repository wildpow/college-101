import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import Spinner from "../components/loading";

const ALL_TEACHERS_COURSES = gql`
  query all_Teachers_Courses {
    teachers(where: { teachersStatus: Active }, orderBy: firstName_ASC) {
      firstName
      lastName
      id
      userName
    }
    courses {
      name
      id
    }
  }
`;

const QueryTeacherCourse = props => (
  <Query query={ALL_TEACHERS_COURSES} pollInterval={1000}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return <h1>Error</h1>;
      if (data) return <props.component data={data} {...props} />;
      return null;
    }}
  </Query>
);

export default QueryTeacherCourse;
