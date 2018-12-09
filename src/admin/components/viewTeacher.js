import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";

import CreateTeacher from "./createTeacher";

const CapsLi = styled.li`
  text-transform: capitalize;
`;
const getTeachers = gql`
  query allTeachers {
    teachers {
      firstName
      lastName
      userName
      id
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
              {data.teachers.map(teacher => (
                <CapsLi key={teacher.id}>
                  {`${teacher.firstName} ${teacher.lastName} 
                    ${teacher.userName}`}
                </CapsLi>
              ))}
            </ul>
            <CreateTeacher teachers={data.teachers} />
          </>
        );
      return null;
    }}
  </Query>
);

export default ViewTeacher;
