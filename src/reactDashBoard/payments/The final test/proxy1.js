import React from "react";
import PayWizardContext, { PaymentContext } from "./context";
import Proxy from "./proxy";

const Prox1 = props => {
  const { data } = props;
  return (
    <PayWizardContext>
      <PaymentContext.Consumer>
        {context => (
          <Proxy
            data={data}
            getExistingUsers={context.getExistingUsers}
            setUserData={context.setUserData}
          />
        )}
      </PaymentContext.Consumer>
    </PayWizardContext>
  );
};

export default Prox1;
