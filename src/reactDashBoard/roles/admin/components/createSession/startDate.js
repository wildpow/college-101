import React from "react";
import PropTypes from "prop-types";
import { FormField, DropButton, Calendar, Box, Text } from "grommet";
import { FormDown } from "grommet-icons";
import StartTimePicker from "./startTimePicker";

const StartDate = props => {
  const today = new Date();
  const day =
    today.getDate() >= 9 ? `0${today.getDate()}` : `${today.getDate()}`;
  const month = `${today.getMonth() + 1}`;
  const todayString = `${today.getFullYear()}-${month}-${day}`;
  const futureString = `${today.getFullYear() + 1}-${month}-${day}`;
  const bounds = [todayString, futureString];

  // const day = `${today.getDate()}`;
  // const month = `${today.getMonth()}`;
  // const todayString = `${today.getFullYear()}-${month + 1}-${day}`;
  // const futureString = `${today.getFullYear() + 1}-${month + 1}-${day}`;

  const { startDateOpen, startDateToggle, startDate, startDateSelect } = props;
  const Cal = (
    <Calendar
      date={startDate}
      onSelect={startDateSelect}
      size="medium"
      bounds={bounds}
    />
  );
  return (
    <FormField label="Date">
      <DropButton
        open={startDateOpen}
        onClose={() => startDateToggle(false)}
        onOpen={() => startDateToggle(true)}
        dropContent={Cal}
        dropAlign={{ left: "left" }}
      >
        <Box direction="row" align="center" pad="small">
          <Text>
            {startDate
              ? new Date(startDate).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </Text>
          <FormDown color="brand" />
        </Box>
      </DropButton>
    </FormField>
  );
};
StartDate.defaultProps = {
  startDate: new Date().toISOString(),
};
StartDate.propTypes = {
  startDateSelect: PropTypes.func.isRequired,
  startDateOpen: PropTypes.bool.isRequired,
  startDate: PropTypes.string,
  startDateToggle: PropTypes.func.isRequired,
};

export default StartDate;
