import React from "react";
import PayWizardContext, { PaymentContext } from "./context";
import UpdateState from "./UpdateState";

const Consumer = props => {
  const { data } = props;
  return (
    <PayWizardContext>
      <PaymentContext.Consumer>
        {context => (
          <UpdateState
            data={data}
            getExistingUsers={context.getExistingUsers}
            setUserData={context.setUserData}
          />
        )}
      </PaymentContext.Consumer>
    </PayWizardContext>
  );
};

export default Consumer;
