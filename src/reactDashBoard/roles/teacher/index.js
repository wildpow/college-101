import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";
import Messages from "../admin/components/sharedComponents/messages";
import ViewSession from "./components/viewSessionTeacher";
import { Header } from "../../Global_styles/roleIndexStyles";
import DropCalendar from "../../Global_components/dropCalendar";
import { TEACHER } from "../../queryComponents/QueryTeacher";

const Employee = props => {
  const { data } = props;
  const [openCal, setOpenCal] = useState(false);
  const [date, setDate] = useState(new Date().toISOString());
  const [event, setEvent] = useState(false);
  const [message, setMessage] = useState("Hello World");
  const eventTimer = () => {
    setEvent(true);
    setTimeout(() => {
      setEvent(false);
    }, 4000);
  };
  if (data.teacher === null)
    return <h1>Please have your admin add you as a teacher</h1>;
  if (data.teacher.sessions.length === 0)
    return <h1>You have no scheduled classes</h1>;
  return (
    <>
      <Box pad={{ horizontal: "small" }}>
        <Header>
          <DropCalendar
            setOpenCal={setOpenCal}
            setDate={setDate}
            date={date}
            openCal={openCal}
          />
          <Box direction="row" gap="small" fill justify="end">
            <Text weight="bold" size="xlarge" color="brand">
              --Teacher View--
            </Text>
          </Box>
        </Header>
        <Box animation="fadeIn">
          <ViewSession
            date={date}
            sessions={data.teacher.sessions}
            teacher={data.teacher.userName}
            eventTimer={eventTimer}
            setMessage={setMessage}
          />
        </Box>
      </Box>
      <Messages message={message} setEvent={setEvent} event={event} />
    </>
  );
};

Employee.propTypes = {
  data: PropTypes.shape({ type: PropTypes.oneOf([TEACHER]) }).isRequired,
};

export default Employee;
