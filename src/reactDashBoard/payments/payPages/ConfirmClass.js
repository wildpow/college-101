import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { Box, Button, Heading } from "grommet";
import states from "../States";

const AnimateWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const ConfirmClass = props => {
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
    </AnimateWrapper>
  );
};
export default ConfirmClass;
