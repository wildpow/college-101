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
} from "grommet";
import { FormUp, FormDown } from "grommet-icons";
// import { timeFormat } from "../../../utils/globalFunctions";
import QuerySessions from "../../queryComponents/all_sessions";
import Test from "./test";

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

const ViewSessionTest = props => {
  const { date } = props;
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
      </Box>

      <QuerySessions component={Test} date={date} />
      <Box flex={false}>
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
      </Box>
    </>
  );
};

export default ViewSessionTest;
