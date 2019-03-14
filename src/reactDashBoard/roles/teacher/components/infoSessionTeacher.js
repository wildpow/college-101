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
import TakeAttendance from "./takeAttendanceNew";

const TableBB = styled(Table)`
  border-bottom: solid 1px rgba(0, 0, 0, 0.33);
  width: 100%;
`;
const InfoSession = props => {
  const {
    selectedSession,
    eventTimer,
    setMessage,
    selectedStart,
    selectedEnd,
    teacher,
  } = props;
  const enrolledStudent =
    selectedSession.length !== 0 && selectedSession.students.length !== 0
      ? selectedSession.students.map(student => student)
      : [];
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
  const attendance =
    selectedSession.attendance === undefined ||
    selectedSession.attendance === null
      ? null
      : selectedSession.attendance.id;

  return (
    <Box>
      <Box
        fill
        alignSelf="center"
        pad={{ vertical: "medium", horizontal: "large" }}
        animation="fadeIn"
        align="center"
      >
        <Box elevation="small" background="white" pad="medium" width="large">
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
                {selectedSession.attendance === null && (
                  <TakeAttendance
                    teacher={teacher}
                    eventTimer={eventTimer}
                    setMessage={setMessage}
                    session={selectedSession}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

InfoSession.defaultProps = {
  selectedSession: [],
};

InfoSession.propTypes = {
  setMessage: PropTypes.func.isRequired,
  eventTimer: PropTypes.func.isRequired,
  selectedEnd: PropTypes.string.isRequired,
  selectedSession: PropTypes.instanceOf(Object),
  selectedStart: PropTypes.string.isRequired,
};

export default InfoSession;
