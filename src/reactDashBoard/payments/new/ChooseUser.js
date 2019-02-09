import React from "react";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const ChooseUser = props => {
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
        <Heading level={2}>Choose a user</Heading>
        <Box gap="small" flex direction="row">
          <Button
            type="button"
            onClick={() => props.next(states.EXISTINGUSER)}
            label="Existing"
          />

          <Button
            type="button"
            onClick={() => props.next(states.CREATEUSER)}
            label="create"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default ChooseUser;
