import React from "react";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const ConfirmClass = props => {
  return (
    <Box
      flex
      direction="column"
      justify="center"
      align="center"
      fill
      animation="slideLeft"
      background="white"
      elevation="large"
    >
      <Box>
        <Heading level={2}>Confirm Class</Heading>
        <Box gap="small" flex direction="row">
          <Button
            type="button"
            onClick={() => props.back(states.CHOOSEUSER)}
            label="back"
          />
          <Button
            type="button"
            onClick={() => props.next(states.PAYMENT)}
            primary
            label="Payment"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ConfirmClass;
