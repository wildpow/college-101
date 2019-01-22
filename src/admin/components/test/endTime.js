import React from "react";
import { MaskedInput, FormField, Text } from "grommet";
import styled from "styled-components";

const ErrorText = styled(Text)`
  height: 24px;
`;

const EndTime = props => {
  const { endTime, onChangeEndTime, endTimeError } = props;
  return (
    <FormField label="End Time">
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
            options: ["am", "pm"],
            regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
            placeholder: "ap",
          },
        ]}
        value={endTime}
        onChange={onChangeEndTime}
      />
      <ErrorText
        alignSelf="center"
        margin="xsmall"
        size="medium"
        color="status-critical"
      >
        {endTimeError && `Please enter end time`}
      </ErrorText>
    </FormField>
  );
};

export default EndTime;