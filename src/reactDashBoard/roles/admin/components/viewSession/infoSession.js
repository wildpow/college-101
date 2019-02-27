import React from "react";
import {
  Box,
  Text,
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
import EditSession from "./editSession";

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
  let message = "";
  const setMesage = res => {
    if (res === 1) message = "None Provided";
    if (res === 2) message = "Absent";
    if (res === 3) message = "Present";
  };

  const attendanceCheck = (att, object) => {
    if (object.length === 0 || att === null) {
      setMesage(1);
      return false;
    }
    const result = object.find(o => o.id === att);
    if (result === undefined) {
      setMesage(2);
      return false;
    }
    setMesage(3);
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
                  <QueryStudents
                    component={AddStudent}
                    session={selectedSession}
                  />
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
                              {message}
                            </Text>
                          ) : (
                            <Text
                              weight="bold"
                              size="large"
                              color="status-warning"
                            >
                              {message}
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
                  <QueryStudents
                    component={AddStudent}
                    session={selectedSession}
                  />
                  <EditSession session={selectedSession} />
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
