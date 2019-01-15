import React from "react";
import styled from "styled-components";
import QueryTeacherCourse from "../queryComponents/all_Teachers_Courses";
import CreateSession from "../components/createSession";
import FilteredCal from "../components/filterCal";
import Stuff from "../components/buttons/test";
import CreateTeacher from "../components/createTeacher";

const Card = styled.div`
  position: absolute;
  width: 400px;
  height: 350px;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
`;

const SessionCard = styled(Card)`
  height: 500px;
`;
const Admin = ({ userName }) => {
  return (
    <>
      <QueryTeacherCourse component={FilteredCal} />
      {/* <QueryTeacherCourse component={CreateSession} /> */}
      <Stuff
        card={SessionCard}
        query={QueryTeacherCourse}
        component={CreateSession}
        header="add session"
        successMessage="Session was created successfully"
        buttonText="add session"
      />
      <Stuff
        card={Card}
        query={QueryTeacherCourse}
        component={CreateTeacher}
        header="add teacher"
        successMessage="Teacher was added successfully"
        buttonText="add teacher"
      />
    </>
  );
};

export default Admin;
