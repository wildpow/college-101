import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../components/loading";

const TEACHER = gql`
  query findTeacher($userName: String!) {
    teacher(where: { userName: $userName }) {
      userName
      firstName
      lastName
      sessions {
        course {
          name
          id
        }
        id
        attendance {
          students {
            firstName
            lastName
            id
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
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const TeacherLogin = props => {
  const { userName } = props;
  return (
    <Query query={TEACHER} variables={{ userName }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <h1>Error</h1>;
        if (data) return <props.component data={data} {...props} />;
        return null;
      }}
    </Query>
  );
};
export default TeacherLogin;
