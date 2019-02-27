import React, { Component } from "react";
import styled from "styled-components";
import { Box, Calendar, DropButton, Heading } from "grommet";
import { FormDown } from "grommet-icons";
import CreateSession from "./components/createSession/createSession";
import QueryTeacherCourse from "../../queryComponents/QueryTeacherCourse";
import ViewSession from "./components/viewSession/viewSession";

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  h2 {
    margin: 0px;
    width: 100%;
  }
  div {
  }
`;
const BottomBorder = styled(Box)`
  transition: all 250ms ease-in-out !important;
  :hover {
    color: green;
  }
`;

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toISOString(),
      calendarOpen: false,
    };
  }

  startDateSelect = date => {
    this.setState({ date, calendarOpen: false });
  };

  startOnOpen = () => this.setState({ calendarOpen: true });

  startOnClose = () => this.setState({ calendarOpen: false });

  render() {
    const { calendarOpen, date } = this.state;
    const { sessions } = this.props;
    return (
      <>
        <Box pad={{ horizontal: "small" }}>
          <Header>
            <Heading level={2}>
              {/* {`Current Classes for`} */}
              <DropButton
                open={calendarOpen}
                onClose={this.startOnClose}
                onOpen={this.startOnOpen}
                dropContent={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <Calendar
                    date={date}
                    onSelect={this.startDateSelect}
                    size="medium"
                    // bounds={bounds}
                  />
                }
              >
                <BottomBorder direction="row" align="center" pad="small">
                  {date
                    ? new Date(date).toDateString()
                    : new Date().toLocaleDateString()}
                  <FormDown color="brand" />
                </BottomBorder>
              </DropButton>
            </Heading>
            <QueryTeacherCourse component={CreateSession} />
          </Header>
          <div>
            <ViewSession sessions={sessions} date={date} />
          </div>
        </Box>
        {/* <Box margin={{ top: "150px" }}>
          <QueryTeacherCourse component={CreateSession} />
        </Box> */}
      </>
    );
  }
}
export default Admin;
