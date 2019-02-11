import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Box, Button, Heading } from "grommet";
import QueryOneUser from "../../queryComponents/QueryOneUser";
// import states from "../States";
import ExistingUserDisplay from "../payComponents/ExistingUserDisplay";
import { PaymentContext } from "./context";

const AnimateWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;
const ExistingUser = props => {
  // const [userName, setUserName] = useState("");
  // useEffect(() => {
  //   const newUserName = localStorage.getItem("existingUserName");
  //   setUserName(newUserName);
  // });
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
        justify="start"
        align="center"
        fill
        background="white"
        elevation="large"
      >
        <Box gap="medium" alignContent="between">
          <Heading level={2}>Is this the correct user?</Heading>
          <PaymentContext.Consumer>
            {context => (
              <>
                {console.log(context.state)}
                <QueryOneUser
                  userName={context.state.currentUserName}
                  component={ExistingUserDisplay}
                  next={props.next}
                  back={props.back}
                />
              </>
            )}
            {/* <QueryOneUser userName={userName} component={ExistingUserDisplay} /> */}
          </PaymentContext.Consumer>
        </Box>
      </Box>
    </AnimateWrapper>
  );
};
export default ExistingUser;
