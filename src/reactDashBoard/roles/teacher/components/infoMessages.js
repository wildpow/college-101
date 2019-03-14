import React, { Children } from "react";
import PropTypes from "prop-types";
import { Box, Text } from "grommet";

const InfoMessages = ({ selectedEnd, selectedStart }) => {
  const startTimeCheck = new Date(selectedStart) < new Date() && true;
  const endTimeTimeCheck = new Date(selectedEnd) < new Date() && true;
  return (
    <Box justify="center" alignContent="center" gap="large">
      {Children}
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
      {!startTimeCheck && endTimeTimeCheck && (
        <Text
          color="status-critical"
          textAlign="center"
          size="large"
          weight="bold"
        >
          Start time is in the future and the end time is in the past !?!
        </Text>
      )}
    </Box>
  );
};
export default InfoMessages;
