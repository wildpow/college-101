import React from "react";
import { timeFormat } from "../../../utils/globalFunctions";
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

const Test = props => {
  const { sessions, date } = props;
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
  return (
    <Box flex={false} overflow="scroll">
      <Table>
        <TableBody>
          {currentSessions.map(session => {
            return (
              <TableRow key={session.id}>
                <TableCell>
                  <Text>{session.course.name}</Text>
                </TableCell>
                <TableCell>
                  <Text>{timeFormat(session.startTime)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{timeFormat(session.endTime)}</Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {`${
                      session.students.length === 0
                        ? 0
                        : session.students.length
                    }
            / 
            ${session.maxSizeOfClass}`}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>
                    {`${session.teacher.firstName} ${session.teacher.lastName}`}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>{session.attendance ? "taken" : "none"}</Text>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Test;
