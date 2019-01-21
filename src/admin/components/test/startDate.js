import React from "react";
import { FormField, DropButton, Calendar, Box, Text } from "grommet";
import { FormDown } from "grommet-icons";

const StartDate = props => {
  const today = new Date();
  const day = `${today.getDate()}`;
  const month = `${today.getMonth()}`;
  const todayString = `${today.getFullYear()}-${month + 1}-${day}`;
  const futureString = `${today.getFullYear() + 1}-${month + 1}-${day}`;

  const {
    startDateOpen,
    startOnOpen,
    startOnClose,
    startDate,
    startDateSelect,
  } = props;
  return (
    <FormField label="Date">
      <DropButton
        open={startDateOpen}
        onClose={startOnClose}
        onOpen={startOnOpen}
        dropContent={
          <Calendar
            date={startDate}
            onSelect={startDateSelect}
            size="medium"
            bounds={[todayString, futureString]}
          />
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
