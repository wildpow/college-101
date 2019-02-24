import React from "react";
import {
  Box,
  Text,
  Heading,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

const InfoSession = props => {
  const resultFilter = (firstArray, secondArray) => {
    return firstArray.filter(
      firstArrayItem =>
        !secondArray.some(
          secondArrayItem => firstArrayItem.id === secondArrayItem.id,
        ),
    );
  };
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
  const studentsPaid =
    selectedSession.length !== 0 && selectedSession.receipts.length !== 0
      ? selectedSession.receipts.map(receipt => receipt.student)
      : [];

  const studentNotPaid = resultFilter(enrolledStudent, studentsPaid);

  const attendanceCheck = (att, object) => {
    if (object.length === 0) return false;
    const poop = object.find(o => o.id === att);
    if (poop === undefined) return false;
    return true;
  };
  return (
    <Box>
      {/* {console.log("bla", selectedSession)}
      {console.log("att", attendance)}
      {console.log("enrolled", enrolledStudent)}
      {console.log("paid", studentsPaid)}
      {console.log("receipt", receipts)} */}
      {/* {console.log("resault", resultFilter(enrolledStudent, studentsPaid))} */}
      {selectedSession.length !== 0 ? (
        <Box
          width="600px"
          // justify="center"
          // alignContent="center"
          alignSelf="center"
          pad={{ vertical: "small", horizontal: "large" }}
        >
          <Box elevation="large" background="white" pad="small">
            <Heading level={3} alignSelf="center">
              Extra Info
            </Heading>
            {selectedSession.students.length === 0 ? (
              <Box justify="center" alignContent="center" gap="small">
                <Text alignSelf="center">
                  Session has no current enrolled students
                </Text>
                <Button
                  alignSelf="center"
                  label="Add Student"
                  onClick={() => console.log("student added")}
                />
              </Box>
            ) : (
              <Box>
                <Table caption="Students enrolled in session">
                  <TableHeader>
                    <TableRow>
                      <TableCell plain size="xsmall">
                        <Box
                          direction="row"
                          pad={{ horizontal: "small", vertical: "xsmall" }}
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
                          pad={{ horizontal: "small", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          Paid
                        </Box>
                      </TableCell>
                      <TableCell plain size="xsmall">
                        <Box
                          direction="row"
                          pad={{ horizontal: "small", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          Attendance
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentNotPaid.map(student => (
                      <TableRow key={student.id}>
                        <TableCell plain size="xsmall">
                          {`${student.firstName} ${student.lastName}`}
                        </TableCell>
                        <TableCell>Not Paid</TableCell>
                        <TableCell>
                          {attendanceCheck(attendance, student.attendance)
                            ? "present"
                            : "absent"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {studentsPaid.map(student => (
                      <TableRow key={student.id}>
                        <TableCell plain size="xsmall">
                          {`${student.firstName} ${student.lastName}`}
                        </TableCell>
                        <TableCell>
                          <Button
                            label="View Receipt"
                            onClick={() =>
                              console.log("View Recipt needs to be implamented")
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {attendanceCheck(attendance, student.attendance)
                            ? "present"
                            : "absent"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export default InfoSession;
