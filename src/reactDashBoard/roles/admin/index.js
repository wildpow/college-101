import React from "react";
import { hpe } from "grommet-theme-hpe";
import { Grommet, Box, Grid, Calendar } from "grommet";
import QueryTeacherCourse from "../../queryComponents/all_Teachers_Courses";
import CreateSession2 from "./components/createSession/createSession2";
import QuerySessions from "../../queryComponents/all_sessions";
import ViewSessionTest from "./components/viewSession/viewSessionTest";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toLocaleDateString(),
    };
  }

  onSelect = nextDate => {
    this.setState({ date: nextDate });
  };

  render() {
    const { date } = this.state;

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
          columns={[".14em", "30%", "flex", ".14em"]}
          rows={["1vh", "70vh", "15vh"]}
          gap="small"
        >
          <Box gridArea="topGutter" />
          <Box gridArea="gutter1" />
          <Box gridArea="nav">
            <Calendar date={date} onSelect={this.onSelect} size="medium" />
          </Box>
          <Box gridArea="main">
            {/* <QueryTeacherCourse component={ViewSession} /> */}
            <QuerySessions component={ViewSessionTest} date={date} />
          </Box>
          <Box gridArea="foot" justifyContent="center">
            <QueryTeacherCourse component={CreateSession2} />
          </Box>
          <Box gridArea="gutter2" />
        </Grid>
      </Grommet>
    );
  }
}

export default Admin;
