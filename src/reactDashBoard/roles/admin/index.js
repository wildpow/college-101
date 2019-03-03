import React, { useState } from "react";
import styled from "styled-components";
import { Box, Calendar, DropButton, Heading } from "grommet";
import { FormDown } from "grommet-icons";
import CreateSession from "./components/createSession/createSession2";
import QueryTeacherCourse from "../../queryComponents/QueryTeacherCourse";
import ViewSession from "./components/viewSession/viewSession";
import Messages from "./messages";

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

const Admin = props => {
  const { sessions } = props;
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
  return (
    <>
      <Box pad={{ horizontal: "small" }}>
        <Header>
          <Heading level={2}>
            {/* {`Current Classes for`} */}
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
          <QueryTeacherCourse
            component={CreateSession}
            eventTimer={eventTimer}
            setMessage={setMessage}
          />
          {console.log(props)}
        </Header>
        <div>
          <ViewSession
            sessions={sessions}
            date={date}
            eventTimer={eventTimer}
            setMessage={setMessage}
          />
        </div>
      </Box>
      <Messages message={message} setEvent={setEvent} event={event} />
    </>
  );
};

export default Admin;
