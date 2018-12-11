import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";

import CreateTeacher from "./createTeacher";

const CapsSpan = styled.span`
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
                <li key={teacher.id}>
                  <CapsSpan>
                    {`${teacher.firstName} 
                    ${teacher.lastName} 
                    `}
                  </CapsSpan>
                  {teacher.userName}
                </li>
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
