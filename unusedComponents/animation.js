import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const AnimateWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const Animation = props => {
  const transision = useSpring({
    opacity: 1,
    transform: "translate3d(0%,0,0)",
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
  });
  const { children } = props;
  return <AnimateWrapper style={transision}>{children}</AnimateWrapper>;
};

export default Animation;
