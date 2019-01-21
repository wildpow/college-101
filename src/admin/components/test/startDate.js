import React from "react";
import { FormField, DropButton, Calendar, Box, Text } from "grommet";
import { FormDown } from "grommet-icons";

const StartDate = props => {
  const {
    startDateOpen,
    startOnOpen,
    startOnClose,
    startDate,
    startTimeSelect,
  } = props;
  return (
    <FormField label="Date">
      <DropButton
        open={startDateOpen}
        onClose={startOnClose}
        onOpen={startOnOpen}
        dropContent={
          <Calendar date={startDate} onSelect={startTimeSelect} size="medium" />
        }
      >
        <Box
          direction="row"
          // gap="medium"
          align="center"
          pad="small"
        >
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

export default StartDate;
