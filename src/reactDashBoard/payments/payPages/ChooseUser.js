import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Box, Button, Heading } from "grommet";
import states from "../States";
import QueryAllUsers from "../../queryComponents/QueryAllUsers";
import UserCheck from "../payComponents/userCheck";

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
        {/* <Box
          width="70%"
          gap="xsmall"
          pad="medium"
          justify="center"
          align="center"
          alignContent="center"
          alignSelf="center"
        > */}
        <Box
          direction="column"
          justify="center"
          flex={false}
          alignContent="center"
          alignSelf="center"
        >
          <Box pad="medium" align="center">
            <Heading level={3}>check if customer exists</Heading>
            <QueryAllUsers component={UserCheck} next={props.next} />
          </Box>
          <Box pad="medium">
            <Heading align="center" alignSelf="center" level={3}>
              Or create new customer
            </Heading>
            <Button
              primary
              type="button"
              label="Create New"
              onClick={() => props.next(states.CREATEUSER)}
            />
          </Box>
        </Box>
        {/* <Heading level={2}>Choose a user</Heading> */}
        {/* <Box gap="small" flex direction="row">
            <Button
              type="button"
              onClick={() => props.next(states.EXISTINGUSER)}
              label="Existing"
            />

            <Button
              type="button"
              onClick={() => props.next(states.CREATEUSER)}
              label="create"
            />
          </Box> */}
      </Box>
      {/* </Box> */}
    </AnimateWrapper>
  );
};
export default ChooseUser;
