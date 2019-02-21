import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Box, Button, Heading } from "grommet";
import states from "../States";
import QueryAllUsers from "../../queryComponents/QueryAllUsers";
import UserCheckDisplay from "../payComponents/ChooseUserDisplay";

const AnimateWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;
const ChooseUser = props => {
  const transision = useSpring({
    opacity: 1,
    transform: "translate3d(0%,0,0)",
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  });
  const { next } = props;
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
        <QueryAllUsers component={UserCheckDisplay} next={next} />
      </Box>
    </AnimateWrapper>
  );
};
export default ChooseUser;
