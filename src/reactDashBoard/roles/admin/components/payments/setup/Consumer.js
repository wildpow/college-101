import React from "react";
import PropTypes from "prop-types";
import PayWizardContext, { PaymentContext } from "./context";
import UpdateState from "./UpdateState";
import QueryAllUsers from "../../../../../queryComponents/QueryAllUsers";

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

Consumer.propTypes = {
  data: PropTypes.shape({ type: PropTypes.oneOf([QueryAllUsers]) }).isRequired,
};

export default Consumer;
