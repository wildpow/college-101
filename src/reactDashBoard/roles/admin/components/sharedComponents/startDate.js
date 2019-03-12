import React from "react";
import PropTypes from "prop-types";
import { FormField, DropButton, Calendar, Box, Text } from "grommet";
import { FormDown } from "grommet-icons";
import InputStatusMessage from "./inputStatusMessage";

const StartDate = props => {
  const today = new Date();
  const day =
    today.getDate() >= 9 ? `0${today.getDate()}` : `${today.getDate()}`;
  const month = `${today.getMonth() + 1}`;
  const todayString = `${today.getFullYear()}-${month}-${day}`;
  const futureString = `${today.getFullYear() + 1}-${month}-${day}`;
  const bounds = [todayString, futureString];

  const {
    startDateOpen,
    startDateToggle,
    startDate,
    startDateSelect,
    success,
    startDateMessage,
    startDateMessageBool,
  } = props;
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
      {success && (
        <InputStatusMessage
          success={success}
          toggle={startDateMessageBool}
          message={startDateMessage}
        />
      )}
    </FormField>
  );
};
StartDate.defaultProps = {
  startDate: new Date().toISOString(),
  success: false,
  startDateMessage: "Date Updated.",
  startDateMessageBool: false,
};
StartDate.propTypes = {
  startDateSelect: PropTypes.func.isRequired,
  startDateOpen: PropTypes.bool.isRequired,
  startDate: PropTypes.string,
  startDateToggle: PropTypes.func.isRequired,
  success: PropTypes.bool,
  startDateMessage: PropTypes.string,
  startDateMessageBool: PropTypes.bool,
};

export default StartDate;
