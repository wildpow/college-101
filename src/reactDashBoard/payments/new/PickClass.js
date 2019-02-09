import React from "react";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const PickClass = props => {
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
        <Heading level={2}>PickClass</Heading>
        <Box gap="small" flex direction="row">
          <Button
            onClick={() => props.back(states.CHOOSEUSER)}
            type="button"
            label="start over"
          />
          <Button
            onClick={() => props.next(states.PACKAGECLASS)}
            type="button"
            label="Package"
          />

          <Button
            onClick={() => props.next(states.SINGLECLASS)}
            type="button"
            label="Single"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default PickClass;
