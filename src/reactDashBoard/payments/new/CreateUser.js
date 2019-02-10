import React from "react";
import { useSpring, animated, useTransition } from "react-spring";
import { Box, Button, Heading } from "grommet";
import states from "./States";
import styled from "styled-components";

const Pooper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;
const pages = [
  ({ style, props }) => (
    <animated.div style={{ ...style, background: "lightpink" }}>
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
    </animated.div>
  ),
];
const CreateUser = props => {
  const transitions = useTransition(p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  return transitions.map(({ item, props, key }) => {
    const Page = pages[item];
    return <Page key={key} style={props} />;
  });
};
export default CreateUser;
