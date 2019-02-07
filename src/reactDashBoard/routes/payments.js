import React from "react";
import styled from "styled-components";
import UserCheck from "../payments/userCheck";
import QueryAllUsers from "../queryComponents/all_users";
import { hpe } from "grommet-theme-hpe";
import { Grommet, Button, Box, Heading, Paragraph, FormField } from "grommet";

const Wrapper = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Payments = () => {
  return (
    <Grommet theme={hpe}>
      <Wrapper>
        <Heading level={1}>Payment</Heading>
        <Box
          elevation="large"
          width="70%"
          gap="xsmall"
          background="white"
          pad="medium"
        >
          <Heading level={2}>Step 1:</Heading>

          <Box
            direction="column"
            justify="center"
            flex={false}
            alignContent="center"
            alignSelf="center"
          >
            <Box pad="medium">
              <Paragraph>check if customer exists</Paragraph>
              <QueryAllUsers component={UserCheck} />
            </Box>
            <Box pad="medium">
              <Paragraph>Or create new customer</Paragraph>
              <Button primary type="button" label="Create New" />
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </Grommet>
  );
};

export default Payments;
