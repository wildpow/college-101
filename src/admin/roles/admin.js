import React from "react";
import styled from "styled-components";
import { hpe } from "grommet-theme-hpe";
import { Grommet, Box, Grid } from "grommet";
import QueryTeacherCourse from "../queryComponents/all_Teachers_Courses";
// import CreateSession from "../components/createSession";
import FilteredCal from "../components/filterCal";
import FeatureWrapper from "../components/buttons/featureWrapper";
import CreateTeacher from "../components/createTeacher";
import CreateSession2 from "../components/test/createSession2";

const Card = styled.div`
  position: absolute;
  width: 400px;
  height: 350px;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
`;

// const SessionCard = styled(Card)`
//   height: 500px;
// `;
const Admin = ({ userName }) => {
  return (
    // col row
    <Grommet theme={hpe}>
      <Grid
        fill
        justifyContent="center"
        alignContent="center"
        areas={[
          { name: "topGutter", start: [0, 0], end: [3, 0] },
          { name: "gutter1", start: [0, 1], end: [0, 2] },
          { name: "nav", start: [1, 1], end: [1, 1] },
          { name: "main", start: [2, 1], end: [2, 1] },
          { name: "gutter2", start: [3, 1], end: [3, 2] },
          { name: "foot", start: [1, 2], end: [2, 2] },
        ]}
        columns={[".14em", "small", "flex", ".14em"]}
        rows={["0vh", "70vh", "15vh"]}
        gap="small"
      >
        <Box gridArea="topGutter" background="yellow" />
        <Box gridArea="gutter1" />
        <Box gridArea="nav" background="brand">
          NAV
        </Box>
        <Box gridArea="main" background="brand">
          MAIN
        </Box>
        <Box gridArea="foot" background="accent-1">
          <QueryTeacherCourse component={CreateSession2} />
        </Box>
        <Box gridArea="gutter2" />
      </Grid>
      {/* <QueryTeacherCourse component={FilteredCal} /> */}
      {/* <FeatureWrapper
        Card={SessionCard}
        Query={QueryTeacherCourse}
        component={CreateSession}
        header="add session"
        successMessage="Session was created successfully"
        buttonText="add session"
      /> */}

      {/* <FeatureWrapper
        Card={Card}
        Query={QueryTeacherCourse}
        component={CreateTeacher}
        header="add teacher"
        successMessage="Teacher was added successfully"
        buttonText="add teacher"
      /> */}
      {/* <QueryTeacherCourse component={CreateSession2} /> */}
    </Grommet>
  );
};

export default Admin;
