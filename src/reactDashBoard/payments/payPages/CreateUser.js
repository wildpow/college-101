import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Box } from "grommet";
import { PaymentContext } from "../context";
import CreateUserDisplay from "../payComponents/CreateUserDisplay";

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
  const { next, back } = props;
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
        <PaymentContext.Consumer>
          {context => (
            <CreateUserDisplay
              next={next}
              back={back}
              users={context.state.userNames}
            />
          )}
        </PaymentContext.Consumer>
      </Box>
    </AnimateWrapper>
  );
};
export default CreateUser;
