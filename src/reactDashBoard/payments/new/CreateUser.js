import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Box, Button, Heading } from "grommet";
import states from "./States";

const AnimateWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const CreateUser = props => {
  const transision = useSpring({
    opacity: 1,
    transform: "translate3d(0%,0,0)",
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  });
  return (
    <AnimateWrapper style={transision}>
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
    </AnimateWrapper>
  );
};
export default CreateUser;
