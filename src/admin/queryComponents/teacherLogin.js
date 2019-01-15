import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { checkPropTypes } from "prop-types";

const TEACHER = gql`
  query findTeacher($userName: String!) {
    teacher(where: { userName: $userName }) {
      userName
      firstName
      lastName
      sessions {
        course {
          name
        }
        id
        attendance {
          students {
            firstName
          }
          id
          status
        }
        status
        startTime
        endTime
        enrolled
        maxSizeOfClass
        students {
          firstName
          lastName
        }
      }
    }
  }
`;

const TeacherLogin = ({ userName }) => (
  <Query query={TEACHER} variables={{ userName }}>
    {({ loading, error, data }) => {
      if (loading) return <h1>loading</h1>;
      if (error) return <h1>Error</h1>;
      if (data) return <checkPropTypes.component data={data} {...props} />;
      return null;
    }}
  </Query>
);

export default TeacherLogin;
