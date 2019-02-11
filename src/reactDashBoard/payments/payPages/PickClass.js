import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Box, Button, Heading } from "grommet";
import states from "../States";

const AnimateWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const PickClass = props => {
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
    </AnimateWrapper>
  );
};
export default PickClass;
