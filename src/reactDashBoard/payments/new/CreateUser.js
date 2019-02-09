import React from "react";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const CreateUser = props => {
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
        <Heading level={2}>Create User</Heading>
        <Box gap="small" flex direction="row">
          <Button
            onClick={() => props.back(states.CHOOSEUSER)}
            type="button"
            label="back"
          />
          <Button
            onClick={() => props.next(states.PICKCLASS)}
            type="button"
            label="Submit"
            primary
          />
        </Box>
      </Box>
    </Box>
  );
};
export default CreateUser;
