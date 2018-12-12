import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from "../services/auth";
import styled from "styled-components";

import QueryTeacherCourse from "../queryComponents/all_Teachers_Courses";
import CreateSession from "../components/createSession";
import FilteredCal from "../components/filterCal";
import AddTeacher from "../components/buttons/addTeachers";

const Container = styled.div`
  margin-top: 50px;
`;

const Main = () => {
  const user = getUser();
  return (
    <Container>
      {/* <h1>Your Main App</h1>
      <ul>
        <li>
          API:
          {user.api && user.api.apiURL}
        </li>
        <li>
          ID:
          {user.id}
        </li>
      </ul> */}

      {/* <ViewTeacher /> */}
      {/* <CreateTeacher /> */}
      {/* <ViewSessions2 /> */}

      <QueryTeacherCourse component={FilteredCal} />
      <QueryTeacherCourse component={CreateSession} />
      <AddTeacher />
    </Container>
  );
};

export default Main;
