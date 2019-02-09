import React from "react";
import styled from "styled-components";
import { Grommet, Button, Box, Heading, Paragraph } from "grommet";
import { hpe } from "grommet-theme-hpe";
import UserCheck from "../payments/userCheck";
import QueryAllUsers from "../queryComponents/QueryAllUsers";
import ProgressiveDrop from "../payments/test3";
import PaymentWizard from "../payments/new/newTest";
const Wrapper = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Payments = () => {
  return (
    <Grommet theme={hpe}>
      <Wrapper>
        <Heading level={1}>Payment</Heading>
        {/* <Box
        elevation="large"
        width="70%"
        gap="xsmall"
        pad="medium"
        justify="center"
        align="center"
        alignContent="center"
        alignSelf="center"
        > */}
        {/* <Box
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
          </Box> */}

        <PaymentWizard />

        {/* <ProgressiveDrop /> */}
        {/* </Box> */}
      </Wrapper>
    </Grommet>
  );
};

export default Payments;
