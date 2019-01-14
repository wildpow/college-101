import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from "../services/auth";

import QueryTeacherCourse from "../queryComponents/all_Teachers_Courses";
import CreateSession from "../components/createSession";
import FilteredCal from "../components/filterCal";
// import AddTeacher from "../components/buttons/addTeachers";
import Stuff from "../components/buttons/test";
import CreateTeacher from "../components/createTeacher";

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
      <Stuff
        query={QueryTeacherCourse}
        component={CreateSession}
        header="add session"
        successMessage="Session was created successfully"
        buttonText="add session"
      />
      <Stuff
        query={QueryTeacherCourse}
        component={CreateTeacher}
        header="add teacher"
        successMessage="Teacher was added successfully"
        buttonText="add teacher"
      />
    </Container>
  );
};

export default Main;
