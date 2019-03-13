import React from "react";
import PropTypes from "prop-types";
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
import AddStudent from "./addStudent";
import EditSession from "../editSession";
import { timeFormat } from "../../../../../utils/globalFunctions";

const TableBB = styled(Table)`
  border-bottom: solid 1px rgba(0, 0, 0, 0.33);
`;
const InfoSession = props => {
  const {
    students,
    selectedSession,
    eventTimer,
    setMessage,
    teachers,
    courses,
    timeAndPrices,
    selectedStart,
    selectedEnd,
  } = props;

  const selectedCourse =
    selectedSession.length !== 0 ? selectedSession.course.name : "default test";
  const selectedType =
    selectedSession.length !== 0
      ? selectedSession.timeAndPrice.name
      : "default test";
  const startDate = new Date(selectedSession.startTime);
  const startTime = timeFormat(selectedSession.startTime);
  const selectedTeacher =
    selectedSession.length !== 0
      ? `${selectedSession.teacher.firstName} ${
          selectedSession.teacher.lastName
        }`
      : "default test";
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
  const startTimeCheck = new Date(selectedStart) < new Date() && true;
  const endTimeTimeCheck = new Date(selectedEnd) < new Date() && true;
  const attendanceCheck = (att, object) => {
    if (att === null) {
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
          animation="fadeIn"
        >
          <Box elevation="small" background="white" pad="medium">
            {selectedSession.students.length === 0 ? (
              <Box justify="center" alignContent="center" gap="large">
                <Text alignSelf="center" size="large">
                  Session has no current enrolled students
                </Text>

                {startTimeCheck && endTimeTimeCheck && (
                  <Text
                    color="status-critical"
                    textAlign="center"
                    size="large"
                    weight="bold"
                  >
                    This session is in the past and can not be edited.
                  </Text>
                )}
                {startTimeCheck && !endTimeTimeCheck && (
                  <Text
                    color="status-critical"
                    textAlign="center"
                    size="large"
                    weight="bold"
                  >
                    This session is in progress right now.
                  </Text>
                )}

                <Box alignSelf="center" direction="row" gap="large">
                  <AddStudent
                    students={students}
                    session={selectedSession}
                    eventTimer={eventTimer}
                    setMessage={setMessage}
                    startTimeCheck={startTimeCheck}
                    endTimeTimeCheck={endTimeTimeCheck}
                  />
                  <EditSession
                    courses={courses}
                    teachers={teachers}
                    timeAndPrices={timeAndPrices}
                    groupVSPrivate={selectedSession.timeAndPrice.groupVsPrivate}
                    session={selectedSession}
                    selectedTeacher={selectedTeacher}
                    selectedType={selectedType}
                    startDate={startDate.toISOString()}
                    selectedCourse={selectedCourse}
                    startTime={startTime}
                    maxSizeOfClass={selectedSession.maxSizeOfClass}
                    eventTimer={eventTimer}
                    setMessage={setMessage}
                    startTimeCheck={startTimeCheck}
                    endTimeTimeCheck={endTimeTimeCheck}
                  />
                </Box>
              </Box>
            ) : (
              <Box>
                {startTimeCheck && endTimeTimeCheck && (
                  <Text
                    color="status-critical"
                    textAlign="center"
                    size="large"
                    weight="bold"
                  >
                    This session is in the past and can not be edited.
                  </Text>
                )}
                {startTimeCheck && !endTimeTimeCheck && (
                  <Text
                    color="status-critical"
                    textAlign="center"
                    size="large"
                    weight="bold"
                  >
                    This session is in progress right now.
                  </Text>
                )}
                {/* Need to delete this state once the create Session is working correctly */}
                {!startTimeCheck && endTimeTimeCheck && (
                  <Text
                    color="status-critical"
                    textAlign="center"
                    size="large"
                    weight="bold"
                  >
                    Start time is in the future and the end time is in the past
                    !?!
                  </Text>
                )}
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
                  <AddStudent
                    eventTimer={eventTimer}
                    setMessage={setMessage}
                    students={students}
                    session={selectedSession}
                    startTimeCheck={startTimeCheck}
                    endTimeTimeCheck={endTimeTimeCheck}
                  />
                  <EditSession
                    courses={courses}
                    teachers={teachers}
                    timeAndPrices={timeAndPrices}
                    groupVSPrivate={selectedSession.timeAndPrice.groupVsPrivate}
                    session={selectedSession}
                    selectedTeacher={selectedTeacher}
                    selectedType={selectedType}
                    selectedCourse={selectedCourse}
                    startDate={startDate.toISOString()}
                    startTime={startTime}
                    maxSizeOfClass={selectedSession.maxSizeOfClass}
                    eventTimer={eventTimer}
                    setMessage={setMessage}
                    startTimeCheck={startTimeCheck}
                    endTimeTimeCheck={endTimeTimeCheck}
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

InfoSession.propTypes = {
  setMessage: PropTypes.func.isRequired,
  eventTimer: PropTypes.func.isRequired,
  selectedEnd: PropTypes.string.isRequired,
  teachers: PropTypes.instanceOf(Object).isRequired,
  students: PropTypes.instanceOf(Object).isRequired,
  courses: PropTypes.instanceOf(Object).isRequired,
  selectedSession: PropTypes.instanceOf(Object).isRequired,
  timeAndPrices: PropTypes.instanceOf(Object).isRequired,
  selectedStart: PropTypes.string.isRequired,
};

export default InfoSession;
