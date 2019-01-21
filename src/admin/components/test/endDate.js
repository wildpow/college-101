import React from "react";
import { FormField, DropButton, Calendar, Box, Text } from "grommet";
import { FormDown } from "grommet-icons";

const EndDate = props => {
  const { endDateOpen, endDate, endTimeSelect, endOnOpen, endOnClose } = props;
  return (
    <FormField label="Date">
      <DropButton
        open={endDateOpen}
        onClose={endOnClose}
        onOpen={endOnOpen}
        dropContent={
          <Calendar date={endDate} onSelect={endTimeSelect} size="medium" />
        }
      >
        <Box
          direction="row"
          // gap="medium"
          align="center"
          pad="small"
        >
          <Text>
            {endDate
              ? new Date(endDate).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </Text>
          <FormDown color="brand" />
        </Box>
      </DropButton>
    </FormField>
  );
};

export default EndDate;
