import React from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { getUser } from "./services/auth";
import styled from "styled-components";

import QueryTeacherCourse from "../queryComponents/all_Teachers_Courses";
import CreateSession from "../components/createSession";
import FilteredCal from "../components/filterCal";

const Container = styled.div`
  margin-top: 20px;
`;

const Main = () => {
  // const user = getUser();
  return (
    <Container>
      {/* {console.log(user.app_metadata.roles[0] === "admin")} */}
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
    </Container>
  );
};

export default Main;
