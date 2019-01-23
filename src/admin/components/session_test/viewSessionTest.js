import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
} from "grommet";
import { FormUp, FormDown } from "grommet-icons";

const COLUMNS = [
  {
    property: "course.name",
    label: "Class Name",
  },
  {
    property: "startTime",
    label: "Start Time",
  },
  {
    property: "endTime",
    label: "End Time",
  },
  {
    property: "maxSizeOfClass",
    label: "Enrollment",
  },
  {
    property: "teacherName",
    label: "Teacher",
  },
  {
    property: "attendence",
    label: "Attendance",
  },
];

class ViewSessionTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poop: "",
    };
  }

  render() {
    const { sessions, date } = this.props;
    const currentSessions = [];
    sessions.map(session => {
      const testDate = new Date(session.startTime);
      const today = new Date(date);
      if (
        today.getMonth() === testDate.getMonth() &&
        today.getDate() === testDate.getDate() &&
        today.getFullYear() === testDate.getFullYear()
      ) {
        currentSessions.push(session);
      }
      return null;
    });
    return (
      <>
        <Box flex={false}>
          <Table caption="Session table">
            <TableHeader>
              <TableRow>
                {COLUMNS.map(c => (
                  <TableCell key={c.property} scope="col">
                    <Text>{c.label}</Text>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
          {console.log(sessions)}
        </Box>

        <Box flex={false} overflow="scroll">
          <Table>
            <TableBody>
              {currentSessions.map(session => {
                return (
                  <TableRow key={session.id}>
                    <TableCell>
                      <Text>{session.course.name}</Text>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </>
    );
  }
}

export default ViewSessionTest;
