import React, { useState } from "react";
import styled from "styled-components";
import { Box, Calendar, DropButton, Heading, Text } from "grommet";
import { FormDown } from "grommet-icons";
// import TeacherCal from "./components/teacherCal";
import Messages from "../admin/components/sharedComponents/messages";
import ClassView from "./components/classView";
import ViewSession from "./components/viewSession";

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  h2 {
    margin: 0px;
    width: 100%;
  }
  div {
  }
`;
const BottomBorder = styled(Box)`
  transition: all 250ms ease-in-out !important;
  :hover {
    color: green;
  }
`;

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
          <Heading level={2}>
            <DropButton
              open={openCal}
              onClose={() => setOpenCal(false)}
              onOpen={() => setOpenCal(true)}
              dropContent={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Calendar
                  date={date}
                  onSelect={newDate => {
                    setDate(newDate);
                    setOpenCal(false);
                  }}
                  size="medium"
                  // bounds={bounds}
                />
              }
            >
              <BottomBorder direction="row" align="center" pad="small">
                {date
                  ? new Date(date).toDateString()
                  : new Date().toLocaleDateString()}
                <FormDown color="brand" />
              </BottomBorder>
            </DropButton>
          </Heading>
          <Box direction="row" gap="small" fill justify="end">
            <Text weight="bold" size="xlarge" color="brand">
              --Teacher View--
            </Text>
          </Box>
        </Header>
        <div>
          <ViewSession
            date={date}
            sessions={data.teacher.sessions}
            teacher={data.teacher.userName}
            eventTimer={eventTimer}
            setMessage={setMessage}
          />
        </div>
      </Box>
      <Messages message={message} setEvent={setEvent} event={event} />
    </>
  );
};

export default Employee;
