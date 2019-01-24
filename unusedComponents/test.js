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
  const {
    sessions,
    selected,
    over,
    sessionMouseOut,
    sessionMouseOver,
    sessionOnFocus,
    sessionOnBlur,
    sessionOnClick,
  } = props;
  // const currentSessions = [];
  // const today = new Date(date);
  // sessions.map(session => {
  //   const testDate = new Date(session.startTime);
  //   if (
  //     today.getMonth() === testDate.getMonth() &&
  //     today.getDate() === testDate.getDate() &&
  //     today.getFullYear() === testDate.getFullYear()
  //   ) {
  //     currentSessions.push(session);
  //   }
  //   return null;
  // });
  return (
    <Box flex={false} overflow="scroll">
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
                <TableCell>
                  <Button
                    fill
                    plain
                    onMouseOver={id => sessionMouseOver(id)}
                    onMouseOut={sessionMouseOut}
                    onFocus={id => sessionOnFocus(id)}
                    onBlur={sessionOnBlur}
                    onClick={id => sessionOnClick(id)}
                  >
                    <Box
                      background={background}
                      pad={{ horizontal: "small", vertical: "xsmall" }}
                    >
                      <Text>{session.course.name}</Text>
                    </Box>
                  </Button>
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
