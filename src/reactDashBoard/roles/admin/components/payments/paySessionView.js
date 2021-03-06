/* eslint-disable react/no-unused-state */
import React from "react";
import PropTypes from "prop-types";
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
import { PaymentContext } from "./setup/context";
import { timeFormat } from "../../../../../utils/globalFunctions";

const COLUMNS = [
  {
    property: "name",
    label: "Class Name",
    size: "xsmall",
  },
  {
    property: "teacherName",
    label: "Teacher",
    size: "xsmall",
  },
  {
    property: "startTime",
    label: "Start Time",
    size: "xsmall",
  },
  {
    property: "endTime",
    label: "End Time",
    size: "xsmall",
  },
  {
    property: "maxSizeOfClass",
    label: "Enrollment",
    size: "xsmall",
  },
  {
    property: "attendence",
    label: "Attendance",
    size: "xsmall",
  },
];

class SessionView extends React.Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    sessions: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sortDirection: "",
      sortProperty: "",
      sessions: [],
      selected: "",
      over: "",
      completeSingleSession: [],
      activeBuyButton: true,
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
    if (nextProps.date !== date) {
      const currentSessions = [];
      const today = new Date(nextProps.date);
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
    return null;
  }

  sessionMouseOver = id => this.setState({ over: id });

  sessionMouseOut = () => this.setState({ over: undefined });

  sessionOnFocus = id => this.setState({ over: id });

  sessionOnBlur = () => this.setState({ over: undefined });

  sessionOnClick = id => {
    const { selected, sessions } = this.state;
    const singleSession = [];
    sessions.map(session => {
      if (session.id === id) {
        singleSession.push(session);
      }
      return null;
    });

    this.setState({
      selected: id === selected ? undefined : id,
      completeSingleSession: singleSession,
      activeBuyButton: false,
    });
  };

  onSort = property => {
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
    // const { date } = this.props;
    const {
      activeBuyButton,
      sortProperty,
      sortDirection,
      sessions,
      selected,
      over,
      completeSingleSession,
    } = this.state;
    const sortIcon = sortDirection === "asc" ? <FormDown /> : <FormUp />;
    return (
      <PaymentContext.Consumer>
        {context => (
          <>
            <Box flex={false} animation="fadeIn" fill>
              <Table caption="Session table header">
                <TableHeader>
                  <TableRow>
                    {COLUMNS.map(c => (
                      <TableCell
                        key={c.property}
                        scope="col"
                        size={c.size}
                        plain
                      >
                        {c.property !== "attendence" &&
                        c.property !== "actions" ? (
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
                              <Text size="large">{c.label}</Text>
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
                            {/* {sortProperty === c.property ? sortIcon : null} */}
                          </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
              </Table>
            </Box>

            <Box overflow="scroll" basis="medium" flex={false}>
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
                      <TableRow key={session.id}>
                        <TableCell scope="row" size="small" plain>
                          <Button
                            fill
                            plain
                            focusIndicator={false}
                            hoverIndicator={false}
                            onMouseOver={() =>
                              this.sessionMouseOver(session.id)
                            }
                            onMouseOut={() => this.sessionMouseOut}
                            onFocus={() => this.sessionOnFocus(session.id)}
                            onBlur={() => this.sessionOnBlur}
                            onClick={() => this.sessionOnClick(session.id)}
                          >
                            <Box
                              background={background}
                              pad={{ horizontal: "small", vertical: "xsmall" }}
                            >
                              <Text>{session.course.name}</Text>
                            </Box>
                          </Button>
                        </TableCell>
                        <TableCell scope="row" size="small" plain>
                          <Button
                            fill
                            plain
                            focusIndicator={false}
                            hoverIndicator={false}
                            onMouseOver={() =>
                              this.sessionMouseOver(session.id)
                            }
                            onMouseOut={() => this.sessionMouseOut}
                            onFocus={() => this.sessionOnFocus(session.id)}
                            onBlur={() => this.sessionOnBlur}
                            onClick={() => this.sessionOnClick(session.id)}
                          >
                            <Box
                              background={background}
                              pad={{ horizontal: "small", vertical: "xsmall" }}
                            >
                              <Text>
                                {`${session.teacher.firstName} ${
                                  session.teacher.lastName
                                }`}
                              </Text>
                            </Box>
                          </Button>
                        </TableCell>
                        <TableCell scope="row" size="small" plain>
                          <Button
                            fill
                            plain
                            focusIndicator={false}
                            hoverIndicator={false}
                            onMouseOver={() =>
                              this.sessionMouseOver(session.id)
                            }
                            onMouseOut={() => this.sessionMouseOut}
                            onFocus={() => this.sessionOnFocus(session.id)}
                            onBlur={() => this.sessionOnBlur}
                            onClick={() => this.sessionOnClick(session.id)}
                          >
                            <Box
                              background={background}
                              pad={{ horizontal: "small", vertical: "xsmall" }}
                            >
                              <Text>{timeFormat(session.startTime)}</Text>
                            </Box>
                          </Button>
                        </TableCell>
                        <TableCell scope="row" size="small" plain>
                          <Button
                            fill
                            plain
                            focusIndicator={false}
                            hoverIndicator={false}
                            onMouseOver={() =>
                              this.sessionMouseOver(session.id)
                            }
                            onMouseOut={() => this.sessionMouseOut}
                            onFocus={() => this.sessionOnFocus(session.id)}
                            onBlur={() => this.sessionOnBlur}
                            onClick={() => this.sessionOnClick(session.id)}
                          >
                            <Box
                              background={background}
                              pad={{ horizontal: "small", vertical: "xsmall" }}
                            >
                              <Text>{timeFormat(session.endTime)}</Text>
                            </Box>
                          </Button>
                        </TableCell>
                        <TableCell scope="row" size="small" plain>
                          <Button
                            fill
                            plain
                            focusIndicator={false}
                            hoverIndicator={false}
                            onMouseOver={() =>
                              this.sessionMouseOver(session.id)
                            }
                            onMouseOut={() => this.sessionMouseOut}
                            onFocus={() => this.sessionOnFocus(session.id)}
                            onBlur={() => this.sessionOnBlur}
                            onClick={() => this.sessionOnClick(session.id)}
                          >
                            <Box
                              background={background}
                              pad={{ horizontal: "small", vertical: "xsmall" }}
                            >
                              <Text>
                                {`${
                                  session.students.length === 0
                                    ? 0
                                    : session.students.length
                                }
            / 
            ${session.maxSizeOfClass}`}
                              </Text>
                            </Box>
                          </Button>
                        </TableCell>
                        <TableCell scope="row" size="small" plain>
                          <Button
                            fill
                            plain
                            focusIndicator={false}
                            hoverIndicator={false}
                            onMouseOver={() =>
                              this.sessionMouseOver(session.id)
                            }
                            onMouseOut={() => this.sessionMouseOut}
                            onFocus={() => this.sessionOnFocus(session.id)}
                            onBlur={() => this.sessionOnBlur}
                            onClick={() => this.sessionOnClick(session.id)}
                          >
                            <Box
                              background={background}
                              pad={{ horizontal: "small", vertical: "xsmall" }}
                            >
                              <Text>
                                {session.attendance ? "taken" : "none"}
                              </Text>
                            </Box>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
            <Box
              direction="row"
              pad={{ top: "large" }}
              justify="center"
              alignContent="around"
              fill
              gap="large"
            >
              <Button
                label="start over"
                onClick={() => context.backOne("pick")}
              />
              {/* {selected && selected !== 0 && ( */}

              <Button
                primary
                label="Buy Now"
                onClick={() => context.selectSession(completeSingleSession)}
                disabled={activeBuyButton}
              />

              {/* )} */}
            </Box>
          </>
        )}
      </PaymentContext.Consumer>
    );
  }
}

export default SessionView;
