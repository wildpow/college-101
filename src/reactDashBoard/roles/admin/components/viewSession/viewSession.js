import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import { FormUp, FormDown } from "grommet-icons";
import SingleSession from "./singleSession";
import InfoSession from "./infoSession";

const ScrollBox = styled(Box)`
  overflow-y: scroll !important;
  overflow: scroll;
  max-height: 317px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.33);
`;

const COLUMNS = [
  {
    property: "name",
    label: "Class",
    size: "xsmall",
  },
  {
    property: "timeAndPrice",
    label: "Group",
    size: "small",
  },
  {
    property: "teacherName",
    label: "Teacher",
    size: "small",
  },
  {
    property: "startTime",
    label: "Start Time",
    size: "small",
  },
  {
    property: "endTime",
    label: "End Time",
    size: "small",
  },
  {
    property: "maxSizeOfClass",
    label: "Enrollment",
    size: "small",
  },
  {
    property: "attendence",
    label: "Attendance",
    size: "small",
  },
];

class ViewSessionTest extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    sessions: PropTypes.instanceOf(Object).isRequired,
    eventTimer: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sortDirection: "",
      sortProperty: "",
      sessions: [],
      selected: "",
      over: "",
      selectedSession: [],
      selectedStart: "",
      selectedEnd: "",
    };
  }

  componentWillMount() {
    const { date, sessions } = this.props;
    const currentSessions = [];
    const today = new Date(date);
    sessions.map(session => {
      const testDate = new Date(session.startTime);
      if (
        today.getMonth() === testDate.getMonth() &&
        today.getDate() === testDate.getDate() &&
        today.getFullYear() === testDate.getFullYear()
      ) {
        currentSessions.push(session);
      }
      return null;
    });
    this.setState({ sessions: currentSessions });
  }

  componentWillReceiveProps(nextProps) {
    const { date, sessions } = this.props;
    if (
      nextProps.date !== date ||
      // nextProps.sessions.length !== sessions.length
      JSON.stringify(nextProps.sessions) !== JSON.stringify(sessions)
    ) {
      const currentSessions = [];
      const today = new Date(nextProps.date);
      nextProps.sessions.map(session => {
        const testDate = new Date(session.startTime);
        if (
          today.getMonth() === testDate.getMonth() &&
          today.getDate() === testDate.getDate() &&
          today.getFullYear() === testDate.getFullYear()
        ) {
          currentSessions.push(session);
        }
        return null;
      });

      this.setState({ sessions: currentSessions, selectedSession: [] });
    }
    return null;
  }

  sessionMouseOver = id => this.setState({ over: id });

  sessionMouseOut = () => this.setState({ over: undefined });

  sessionOnFocus = id => this.setState({ over: id });

  sessionOnBlur = () => this.setState({ over: undefined });

  sessionOnClick = (id, session) => {
    const {
      selected,
      selectedSession,
      selectedStart,
      selectedEnd,
    } = this.state;
    this.setState({
      selected: id === selected ? undefined : id,
      selectedSession: session.id === selectedSession.id ? [] : session,
      selectedStart:
        session.startTime === selectedStart ? "" : session.startTime,
      selectedEnd: session.endTime === selectedEnd ? "" : session.endTime,
    });
  };

  onSort = property => {
    console.log(property);
    const { sortProperty, sortDirection, sessions } = this.state;
    let nextSortDirection;
    if (sortProperty === property) {
      nextSortDirection = sortDirection === "asc" ? "desc" : "asc";
      this.setState({ sortDirection: nextSortDirection });
    } else {
      nextSortDirection = "asc";
    }
    const data = sessions.sort((d1, d2) => {
      if (property === "startTime" || property === "endTime") {
        return nextSortDirection === "asc"
          ? new Date(d1[property]) - new Date(d2[property])
          : new Date(d2[property]) - new Date(d1[property]);
      }
      if (property === "timeAndPrice") {
        const v1 = d1.timeAndPrice.name.toUpperCase();
        const v2 = d2.timeAndPrice.name.toUpperCase();
        if (v1 < v2) {
          return nextSortDirection === "asc" ? -1 : 1;
        }
        if (v1 > v2) {
          return nextSortDirection === "asc" ? 1 : -1;
        }
        return 0;
      }

      if (property === "name") {
        const v1 = d1.course.name.toUpperCase();
        const v2 = d2.course.name.toUpperCase();
        if (v1 < v2) {
          return nextSortDirection === "asc" ? -1 : 1;
        }
        if (v1 > v2) {
          return nextSortDirection === "asc" ? 1 : -1;
        }
        return 0;
      }
      if (property === "teacherName") {
        const v1 = d1.teacher.firstName.toUpperCase();
        const v2 = d2.teacher.firstName.toUpperCase();
        if (v1 < v2) {
          return nextSortDirection === "asc" ? -1 : 1;
        }
        if (v1 > v2) {
          return nextSortDirection === "asc" ? 1 : -1;
        }
        return 0;
      }
      if (property === "maxSizeOfClass") {
        return nextSortDirection === "asc"
          ? d1.students.length - d2.students.length
          : d2.students.length - d1.students.length;
      }
      if (property === "attendence") {
        if (d1.attendence !== null || d2.attendence !== null) {
          return nextSortDirection === "asc" ? -1 : 1;
        }
        return nextSortDirection === "asc" ? 1 : -1;
      }
      return null;
    });

    this.setState({
      sessions: data,
      sortProperty: property,
      sortDirection: nextSortDirection,
    });
  };

  render() {
    const {
      sortProperty,
      sortDirection,
      selected,
      over,
      sessions,
      selectedSession,
      selectedStart,
      selectedEnd,
    } = this.state;
    const {
      eventTimer,
      setMessage,
      courses,
      teachers,
      timeAndPrices,
    } = this.props;
    const sortIcon = sortDirection === "asc" ? <FormDown /> : <FormUp />;
    return (
      <>
        <Box>
          <Table caption="Session table header">
            <TableHeader>
              <TableRow>
                {COLUMNS.map(c => (
                  <TableCell key={c.property} scope="col" size={c.size} plain>
                    {c.property !== "attendence" && c.property !== "actions" ? (
                      <Button
                        fill
                        hoverIndicator
                        onClick={() => this.onSort(c.property)}
                      >
                        <Box
                          direction="row"
                          pad={{ horizontal: "small", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          <Text size="large" truncate>
                            {c.label}
                          </Text>
                          {sortProperty === c.property ? sortIcon : null}
                        </Box>
                      </Button>
                    ) : (
                      <Box
                        direction="row"
                        pad={{ horizontal: "small", vertical: "xsmall" }}
                        justify={c.align}
                        border="bottom"
                        gap="xsmall"
                      >
                        <Text size="large">{c.label}</Text>
                        {sortProperty === c.property ? sortIcon : null}
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
        </Box>

        <ScrollBox>
          <Table caption="list of session for current date">
            <TableBody>
              {sessions.map(session => {
                let background;
                if (session.id === selected) {
                  background = "brand";
                } else if (session.id === over) {
                  background = "light-2";
                }
                return (
                  <SingleSession
                    sessionMouseOver={this.sessionMouseOver}
                    sessionMouseOut={this.sessionMouseOut}
                    sessionOnFocus={this.sessionOnFocus}
                    sessionOnBlur={this.sessionOnBlur}
                    sessionOnClick={this.sessionOnClick}
                    background={background}
                    session={session}
                    key={session.id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </ScrollBox>
        <InfoSession
          courses={courses}
          teachers={teachers}
          timeAndPrices={timeAndPrices}
          selectedEnd={selectedEnd}
          selectedStart={selectedStart}
          selectedSession={selectedSession}
          eventTimer={eventTimer}
          setMessage={setMessage}
        />
      </>
    );
  }
}

export default ViewSessionTest;
