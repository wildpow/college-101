import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CreateTeacher from "./createTeacher";
const getTeachers = gql`
  query allTeachers {
    teachers {
      firstName
      lastName
      userName
    }
  }
`;

const ViewTeacher = () => (
  <Query query={getTeachers} pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) return <h1>loading</h1>;
      if (error) return <h1>Error</h1>;
      if (data)
        return (
          <>
            <h2>Current Teachers</h2>
            <ul>
              {data.teachers.map(teacher => {
                return (
                  <li>
                    {teacher.firstName} {teacher.lastName}
                  </li>
                );
              })}
            </ul>
            <CreateTeacher teachers={data.teachers} />
          </>
        );
      return null;
    }}
  </Query>
);

export default ViewTeacher;
