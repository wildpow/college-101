import React from "react";
import styled from "styled-components";
import { Grommet, Button, Box, Heading, Paragraph } from "grommet";
import { hpe } from "grommet-theme-hpe";
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

        <PaymentWizard />

        {/* <ProgressiveDrop /> */}
        {/* </Box> */}
      </Wrapper>
    </Grommet>
  );
};

export default Payments;
