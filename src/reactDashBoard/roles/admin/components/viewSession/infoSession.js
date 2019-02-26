import React from "react";
import {
  Box,
  Text,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import styled from "styled-components";
import ViewReceipt from "./viewReceipt";
import QueryReceipt from "../../../../queryComponents/QueryReceipt";
import QueryStudents from "../../../../queryComponents/QueryStudents";
import AddStudent from "./addStudent";

const TableBB = styled(Table)`
  border-bottom: solid 1px rgba(0, 0, 0, 0.33);
`;
const InfoSession = props => {
  const { selectedSession } = props;
  const attendance =
    selectedSession.attendance === undefined ||
    selectedSession.attendance === null
      ? null
      : selectedSession.attendance.id;
  const receipts =
    selectedSession.length !== 0 && selectedSession.receipts.length !== 0
      ? selectedSession.receipts.map(receipt => receipt.id)
      : [];
  const enrolledStudent =
    selectedSession.length !== 0 && selectedSession.students.length !== 0
      ? selectedSession.students.map(student => student)
      : [];
  const receiptCheck = (sessionReceipts, studentReceipts) => {
    if (studentReceipts.length === 0 || sessionReceipts.length === 0)
      return false;
    let result = "";
    studentReceipts.forEach(val => {
      if (sessionReceipts.includes(val.id)) {
        result = val.id;
      } else {
        result = false;
      }
    });
    return result;
  };
  const attendanceCheck = (att, object) => {
    if (object.length === 0) return false;
    const result = object.find(o => o.id === att);
    if (result === undefined) return false;
    return true;
  };
  return (
    <Box>
      {selectedSession.length !== 0 ? (
        <Box
          fill
          alignSelf="center"
          pad={{ vertical: "medium", horizontal: "large" }}
        >
          <Box elevation="small" background="white" pad="medium">
            {selectedSession.students.length === 0 ? (
              <Box justify="center" alignContent="center" gap="large">
                <Text alignSelf="center" size="large">
                  Session has no current enrolled students
                </Text>
                <Box alignSelf="center">
                  <QueryStudents component={AddStudent} />
                </Box>
              </Box>
            ) : (
              <Box>
                <TableBB
                  caption="Students enrolled in session"
                  margin={{ vertical: "xsmall" }}
                >
                  <TableHeader>
                    <TableRow>
                      <TableCell plain size="xsmall">
                        <Box
                          direction="row"
                          pad={{ horizontal: "xsmall", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          <Text size="large">Name</Text>
                        </Box>
                      </TableCell>
                      <TableCell plain size="xsmall">
                        <Box
                          direction="row"
                          pad={{ horizontal: "xsmall", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          <Text size="large">Paid</Text>
                        </Box>
                      </TableCell>
                      <TableCell plain size="xsmall">
                        <Box
                          direction="row"
                          pad={{ horizontal: "xsmall", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          <Text size="large">Attendance</Text>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrolledStudent.map(student => (
                      <TableRow key={student.id}>
                        <TableCell plain size="xsmall">
                          {`${student.firstName} ${student.lastName}`}
                        </TableCell>
                        <TableCell>
                          {receiptCheck(receipts, student.receipts) ? (
                            <QueryReceipt
                              component={ViewReceipt}
                              receiptID={receiptCheck(
                                receipts,
                                student.receipts,
                              )}
                            />
                          ) : (
                            <Text
                              color="status-critical"
                              weight="bold"
                              size="large"
                            >
                              No Receipt
                            </Text>
                          )}
                        </TableCell>
                        <TableCell>
                          {attendanceCheck(attendance, student.attendance) ? (
                            <Text weight="bold" size="large" color="brand">
                              present
                            </Text>
                          ) : (
                            <Text
                              weight="bold"
                              size="large"
                              color="status-warning"
                            >
                              absent
                            </Text>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableBB>
                <Box
                  direction="row"
                  justify="evenly"
                  pad={{ vertical: "small" }}
                  margin={{ vertical: "xsmall" }}
                >
                  <QueryStudents component={AddStudent} />
                  <Button
                    label="Edit Session"
                    onClick={() => console.log("Edit Session")}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default InfoSession;
