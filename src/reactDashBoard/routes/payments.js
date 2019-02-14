import React from "react";
import styled from "styled-components";
import { Grommet, Heading } from "grommet";
import { hpe } from "grommet-theme-hpe";
// import PaymentWizard from "../payments/PaymentWizard";
import QueryAllUsers from "../queryComponents/QueryAllUsers";
// import Test from "../payments/tester/test";
// import PayWizardContext from "../payments/tester/context";
import Consumer from "../payments/final/setup/Consumer";

const Wrapper = styled.div`
  /* margin-top: 0px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;
const Payments = () => {
  return (
    <Grommet theme={hpe}>
      <Wrapper>
        <Heading level={1}>Payment</Heading>
        {/* <PayWizardContext>
          <QueryAllUsers component={Test} />
        </PayWizardContext> */}
        <QueryAllUsers component={Consumer} />
        {/* <PaymentWizard /> */}
        {/* <ProgressiveDrop /> */}
        {/* </Box> */}
      </Wrapper>
    </Grommet>
  );
};

export default Payments;
