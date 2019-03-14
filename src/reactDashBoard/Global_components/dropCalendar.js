import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Calendar, DropButton, Heading } from "grommet";
import { FormDown } from "grommet-icons";

const BottomBorder = styled(Box)`
  transition: all 250ms ease-in-out !important;
  :hover {
    color: green;
  }
`;
const DropCalendar = ({ openCal, setOpenCal, setDate, date }) => {
  return (
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
  );
};

DropCalendar.propTypes = {
  setDate: PropTypes.func.isRequired,
  setOpenCal: PropTypes.func.isRequired,
  openCal: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
};

export default DropCalendar;
