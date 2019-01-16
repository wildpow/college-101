import React from "react";
import styled from "styled-components";
import QueryTeacherCourse from "../queryComponents/all_Teachers_Courses";
import CreateSession from "../components/createSession";
import FilteredCal from "../components/filterCal";
import FeatureWrapper from "../components/buttons/featureWrapper";
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
      <FeatureWrapper
        Card={SessionCard}
        Query={QueryTeacherCourse}
        component={CreateSession}
        header="add session"
        successMessage="Session was created successfully"
        buttonText="add session"
      />
      <FeatureWrapper
        Card={Card}
        Query={QueryTeacherCourse}
        component={CreateTeacher}
        header="add teacher"
        successMessage="Teacher was added successfully"
        buttonText="add teacher"
      />
    </>
  );
};

export default Admin;
