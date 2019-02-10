import React from "react";
import { hpe } from "grommet-theme-hpe";
import { FormDown } from "grommet-icons";
import { Grommet, Box, Grid, Calendar, DropButton, Text } from "grommet";
import QueryTeacherCourse from "../../queryComponents/all_Teachers_Courses";
import CreateSession2 from "./components/createSession/createSession2";
import QuerySessions from "../../queryComponents/all_sessions";
import ViewSessionTest from "./components/viewSession/viewSessionTest";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropCal: false,
      date: new Date().toLocaleDateString(),
      startDateOpen: false,
      startDate: new Date().toISOString(),
      col: [".14em", "30%", "flex", ".14em"],
    };
  }

  componentDidMount() {
    if (window.innerWidth < 1266) {
      this.setState({ dropCal: true, col: [".14em", "5%", "flex", ".14em"] });
    }
  }

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  onSelect = nextDate => {
    this.setState({ startDate: nextDate });
  };

  startOnOpen = () => this.setState({ startDateOpen: true });

  startOnClose = () => this.setState({ startDateOpen: false });

  render() {
    const { dropCal, startDate, startDateOpen, col } = this.state;

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
          columns={col}
          rows={["1vh", "70vh", "15vh"]}
          gap="small"
        >
          <Box gridArea="topGutter" />
          <Box gridArea="gutter1" />
          <Box gridArea="nav">
            {dropCal ? (
              <DropButton
                open={startDateOpen}
                onClose={this.startOnClose}
                onOpen={this.startOnOpen}
                dropContent={
                  <Calendar
                    date={startDate}
                    onSelect={this.startDateSelect}
                    size="medium"
                    // bounds={bounds}
                  />
                }
              >
                <Box
                  direction="row"
                  // gap="medium"
                  align="center"
                  pad="small"
                >
                  <Text>
                    {startDate
                      ? new Date(startDate).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </Text>
                  <FormDown color="brand" />
                </Box>
              </DropButton>
            ) : (
              <Calendar
                date={startDate}
                onSelect={this.onSelect}
                size="medium"
              />
            )}
          </Box>
          <Box gridArea="main">
            {/* <QueryTeacherCourse component={ViewSession} /> */}
            <QuerySessions component={ViewSessionTest} date={startDate} />
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
