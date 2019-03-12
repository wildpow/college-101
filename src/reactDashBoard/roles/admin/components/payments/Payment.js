import React from "react";
import {
  Box,
  Heading,
  TableRow,
  TableCell,
  TableHeader,
  Table,
  TableBody,
  Button,
  Text,
} from "grommet";
import { PaymentContext } from "./setup/context";
import { timeFormat } from "../../../../../utils/globalFunctions";

const Payment = () => {
  return (
    <PaymentContext.Consumer>
      {context => (
        <Box>
          <Box>
            <Heading level={3}>Selected Class</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell scope="col" border="bottom">
                    Course
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    start
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    End
                  </TableCell>
                  <TableCell scope="col" border="bottom">
                    teacher
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {context.state.selectedSession[0].course.name}
                  </TableCell>
                  <TableCell>
                    {timeFormat(context.state.selectedSession[0].startTime)}
                  </TableCell>
                  <TableCell>
                    {timeFormat(context.state.selectedSession[0].endTime)}
                  </TableCell>
                  <TableCell>
                    {`${context.state.selectedSession[0].teacher.firstName} ${
                      context.state.selectedSession[0].teacher.lastName
                    }`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box>
            <Heading level={3}>Choose or Create Student</Heading>
            {context.state.user.students.length === 0 ? (
              <>
                <Text>Enter student to be enrolled</Text>
                <input type="text" placeholder="John" />
                <input type="text" placeholder="Doe" />
                <Button label="Add" />
              </>
            ) : (
              <>
                <Text>Please choose a student to enroll</Text>
                <ul>
                  {context.state.user.students.map(student => (
                    <li>{`${student.firstName} ${student.lastName}`}</li>
                  ))}
                </ul>
              </>
            )}
          </Box>
          <Box>
            <Heading level={3}>User Info</Heading>
            <Text weight="bold">Name: </Text>
            {`${context.state.user.firstName} 
            ${context.state.user.lastName}`}
            <Text weight="bold">Email: </Text>
            {context.state.user.username}
            <Text weight="bold">Address: </Text>

            {context.state.user.mailingAddress[0]}
            <br />
            {`${context.state.user.mailingAddress[1]} ${
              context.state.user.mailingAddress[2]
            } ${context.state.user.mailingAddress[3]}`}
          </Box>
          <Box>
            <Heading level={3}>Payment Type</Heading>
            <select>
              <option>Check</option>
              <option>Cash</option>
              <option>Credit</option>
              <option>On-line</option>
            </select>
          </Box>
        </Box>
      )}
    </PaymentContext.Consumer>
  );
};

export default Payment;
