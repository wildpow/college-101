import React from "react";
import {
  Box,
  Button,
  Table,
  Heading,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
  Grommet,
} from "grommet";
import { hpe } from "grommet-theme-hpe";

import { FormUp, FormDown, Add } from "grommet-icons";
import { timeFormat } from "../../../utils/globalFunctions";
// import QuerySessions from "../../queryComponents/all_sessions";
// import Test from "./test";

const COLUMNS = [
  {
    property: "name",
    label: "Class Name",
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
  {
    property: "actions",
    label: "Actions",
    size: "small",
  },
];

class ViewSessionTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDirection: "",
      sortProperty: "",
      sessions: [],
      selected: "",
      over: "",
    };
  }

  componentWillMount() {
    const currentSessions = [];
    const today = new Date(this.props.date);
    this.props.sessions.map(session => {
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
    if (nextProps.date !== this.props.date) {
      const currentSessions = [];
      const today = new Date(nextProps.date);
      this.props.sessions.map(session => {
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
    this.setState({
      selected: id === this.state.selected ? undefined : id,
    });
  };

  onSort = property => {
    const { sortProperty, sortDirection } = this.state;
    let nextSortDirection;
    if (sortProperty === property) {
      nextSortDirection = sortDirection === "asc" ? "desc" : "asc";
      this.setState({ sortDirection: nextSortDirection });
    } else {
      nextSortDirection = "asc";
    }
    const data = this.state.sessions.sort((d1, d2) => {
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
    });

    this.setState({
      sessions: data,
      sortProperty: property,
      sortDirection: nextSortDirection,
    });
  };

  render() {
    const { date } = this.props;
    const {
      sortProperty,
      sortDirection,
      sessions,
      selected,
      over,
    } = this.state;
    const sortIcon = sortDirection === "asc" ? <FormDown /> : <FormUp />;
    return (
      <>
        <Box flex={false}>
          <Heading level={2}>
            {`Current Classes for ${new Date(date).toDateString()}`}
          </Heading>
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
                        onMouseOver={() => this.setState({ over: session.id })}
                        onMouseOut={() => this.setState({ over: undefined })}
                        onFocus={() => this.setState({ over: session.id })}
                        onBlur={() => this.setState({ over: undefined })}
                        onClick={() =>
                          this.setState({
                            selected:
                              session.id === selected ? undefined : session.id,
                          })
                        }
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
                        onMouseOver={() => this.setState({ over: session.id })}
                        onMouseOut={() => this.setState({ over: undefined })}
                        onFocus={() => this.setState({ over: session.id })}
                        onBlur={() => this.setState({ over: undefined })}
                        onClick={() =>
                          this.setState({
                            selected:
                              session.id === selected ? undefined : session.id,
                          })
                        }
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
                        onMouseOver={() => this.setState({ over: session.id })}
                        onMouseOut={() => this.setState({ over: undefined })}
                        onFocus={() => this.setState({ over: session.id })}
                        onBlur={() => this.setState({ over: undefined })}
                        onClick={() =>
                          this.setState({
                            selected:
                              session.id === selected ? undefined : session.id,
                          })
                        }
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
                        onMouseOver={() => this.setState({ over: session.id })}
                        onMouseOut={() => this.setState({ over: undefined })}
                        onFocus={() => this.setState({ over: session.id })}
                        onBlur={() => this.setState({ over: undefined })}
                        onClick={() =>
                          this.setState({
                            selected:
                              session.id === selected ? undefined : session.id,
                          })
                        }
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
                        onMouseOver={() => this.setState({ over: session.id })}
                        onMouseOut={() => this.setState({ over: undefined })}
                        onFocus={() => this.setState({ over: session.id })}
                        onBlur={() => this.setState({ over: undefined })}
                        onClick={() =>
                          this.setState({
                            selected:
                              session.id === selected ? undefined : session.id,
                          })
                        }
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
                        onMouseOver={() => this.setState({ over: session.id })}
                        onMouseOut={() => this.setState({ over: undefined })}
                        onFocus={() => this.setState({ over: session.id })}
                        onBlur={() => this.setState({ over: undefined })}
                        onClick={() =>
                          this.setState({
                            selected:
                              session.id === selected ? undefined : session.id,
                          })
                        }
                      >
                        <Box
                          background={background}
                          pad={{ horizontal: "small", vertical: "xsmall" }}
                        >
                          <Text>{session.attendance ? "taken" : "none"}</Text>
                        </Box>
                      </Button>
                    </TableCell>
                    <TableCell scope="row" size="small" plain>
                      <Box
                        direction="row"
                        pad={{ horizontal: "small", vertical: "xsmall" }}
                      >
                        <Button
                          label="View"
                          onClick={() => console.log("view")}
                          margin={{ right: "4px" }}
                        />

                        <Button
                          margin={{ left: "4px" }}
                          onClick={() => console.log("edit")}
                          label="Edit"
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>

        {/* <Box>
          <Table caption="Table footer">
            <TableFooter>
              <TableRow>
                <TableCell align="center">
                  <Heading level={2}>
                    {`Current Classes for ${new Date(date).toDateString()}`}
                  </Heading>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box> */}
      </>
    );
  }
}

export default ViewSessionTest;
