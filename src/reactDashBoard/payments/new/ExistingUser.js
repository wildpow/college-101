import React from "react";
import { useSpring, animated } from "react-spring";
import { Box, Button, Heading } from "grommet";
import states from "./States";
import styled from "styled-components";

const Pooper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;
const ExistingUser = props => {
  const poop = useSpring({
    opacity: 1,
    transform: "translate3d(0%,0,0)",
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  });

  return (
    <Pooper style={poop}>
      <Box
        flex
        direction="column"
        justify="center"
        align="center"
        fill
        background="white"
        elevation="large"
      >
        <Box>
          <Heading level={2}>Existing User</Heading>
          <Box gap="small" flex direction="row">
            <Button
              onClick={() => props.back(states.CHOOSEUSER)}
              type="button"
              label="Back"
            />

            <Button
              onClick={() => props.next(states.PICKCLASS)}
              type="button"
              label="Confirm"
              primary
            />
          </Box>
        </Box>
      </Box>
    </Pooper>
  );
};
export default ExistingUser;
