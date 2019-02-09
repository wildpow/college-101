import React from "react";
import { Box, Button, Heading } from "grommet";

import states from "./States";

const PackageClass = props => {
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
        <Heading level={2}>PackageClass</Heading>
        <Box gap="small" flex direction="row">
          <Button
            onClick={() => props.back(states.PICKCLASS)}
            type="button"
            label="back"
          />
          <Button
            onClick={() => props.next(states.CONFIRM)}
            type="button"
            label="Confirm"
            primary
          />

          <Button
            onClick={() => props.back(states.CHOOSEUSER)}
            type="button"
            label="Start Over"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default PackageClass;
