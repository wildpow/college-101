import React from "react";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const Payment = props => {
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
        <Heading level={2}>Make payment</Heading>
        <Box gap="small" flex direction="row">
          <Button
            type="button"
            onClick={() => props.back(states.CONFIRM)}
            label="back"
          />
          <Button
            type="button"
            onClick={() => props.next(states.RECIPT)}
            label="Payment"
            primary
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Payment;
