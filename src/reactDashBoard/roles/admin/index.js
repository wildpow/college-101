import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "grommet";
import NonApGroup from "./components/createNonApGroup";
import ViewSession from "./components/viewSession/viewSession";
import Messages from "./components/sharedComponents/messages";
import PrivateTutoring from "./components/createPrivateTutoring";
import QueryAdminViewAll from "../../queryComponents/QueryAdminViewAll";
import { Header } from "../../Global_styles/roleIndexStyles";
import DropCalendar from "../../Global_components/dropCalendar";

const Admin = props => {
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
            <PrivateTutoring
              teachers={data.teachers}
              courses={data.courses}
              timeAndPrices={data.timeAndPrices}
              eventTimer={eventTimer}
              setMessage={setMessage}
            />
            <NonApGroup
              eventTimer={eventTimer}
              setMessage={setMessage}
              teachers={data.teachers}
              courses={data.courses}
              timeAndPrices={data.timeAndPrices}
            />
          </Box>
        </Header>
        <Box animation="fadeIn">
          <ViewSession
            timeAndPrices={data.timeAndPrices}
            courses={data.courses}
            teachers={data.teachers}
            sessions={data.sessions}
            students={data.students}
            date={date}
            eventTimer={eventTimer}
            setMessage={setMessage}
          />
        </Box>
      </Box>
      <Messages message={message} setEvent={setEvent} event={event} />
    </>
  );
};

Admin.propTypes = {
  data: PropTypes.shape({ type: PropTypes.oneOf([QueryAdminViewAll]) })
    .isRequired,
};

export default Admin;
