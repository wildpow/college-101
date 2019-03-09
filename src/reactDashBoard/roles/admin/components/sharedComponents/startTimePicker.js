import React from "react";
import PropTypes from "prop-types";
import { MaskedInput, FormField } from "grommet";
import { ErrorText } from "../../sharedStyles/sharedStyles";

const StartTimePicker = props => {
  const {
    startTime,
    onChangeStartTime,
    startTimeError,
    startTimeMessage,
  } = props;
  return (
    <FormField label="Start Time">
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            options: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ],
            regexp: /^1[1-2]$|^[0-9]$/,
            placeholder: "hh",
          },
          { fixed: ":" },
          {
            length: 2,
            options: ["00", "15", "30", "45"],
            regexp: /^[0-5][0-9]$|^[0-9]$/,
            placeholder: "mm",
          },
          { fixed: " " },
          {
            length: 2,
            options: ["AM", "PM"],
            // /^[ap]m$|^[AP]M$|^[aApP]$/
            regexp: /\s*([AaPp][Mm])/,
            placeholder: "AM/PM",
          },
        ]}
        value={startTime}
        onChange={onChangeStartTime}
      />
      <ErrorText
        alignSelf="center"
        margin="xsmall"
        size="medium"
        color="status-critical"
      >
        {startTimeError && <>{startTimeMessage}</>}
      </ErrorText>
    </FormField>
  );
};

StartTimePicker.defaultProps = {
  startTimeError: false,
  startTimeMessage: "Default Error",
  startTime: new Date().toISOString(),
};

StartTimePicker.propTypes = {
  onChangeStartTime: PropTypes.func.isRequired,
  startTimeError: PropTypes.bool,
  startTimeMessage: PropTypes.string,
  startTime: PropTypes.string,
};

export default StartTimePicker;
