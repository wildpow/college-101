import React from "react";
import { PaymentContext } from "./context";
import UserCheck from "./UserCheck";
import CreateUser from "./CreateUser";
import PickClass from "./PickClass";

const Display = () => {
  return (
    <PaymentContext.Consumer>
      {context => (
        <>
          {context.state.userCheckBool && <UserCheck />}
          {context.state.createUserBool && <CreateUser />}
          {context.state.chooseClassBool && <PickClass />}
        </>
      )}
    </PaymentContext.Consumer>
  );
};

export default Display;
