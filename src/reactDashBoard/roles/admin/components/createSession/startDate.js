import React from "react";
import { FormField, DropButton, Calendar, Box, Text } from "grommet";
import { FormDown } from "grommet-icons";

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
    startOnOpen,
    startOnClose,
    startDate,
    startDateSelect,
  } = props;
  return (
    <FormField label="Date">
      {console.log("bounds", bounds)}
      {console.log("month", month)}

      {console.log("startDate", startDate)}
      {console.log("todayString", todayString)}
      {console.log("futureString", futureString)}
      <DropButton
        open={startDateOpen}
        onClose={startOnClose}
        onOpen={startOnOpen}
        dropContent={
          <Calendar
            date={startDate}
            onSelect={startDateSelect}
            size="medium"
            bounds={bounds}
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
