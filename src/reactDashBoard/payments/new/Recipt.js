import React from "react";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const Recipt = props => {
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
        <Heading level={2}>Recipt</Heading>
        <Button
          type="button"
          onClick={() => props.back(states.CHOOSEUSER)}
          primary
          label="New payment"
        />
      </Box>
    </Box>
  );
};

export default Recipt;
