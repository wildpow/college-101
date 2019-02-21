import React from "react";
import { PaymentContext } from "./setup/context";
import UserCheck from "./UserCheck";
import CreateUser from "./CreateUser";
import PickClass from "./PickClass";
import Payment from "./Payment";

const Display = () => {
  return (
    <PaymentContext.Consumer>
      {context => (
        <>
          {context.state.userCheckBool && <UserCheck />}
          {context.state.createUserBool && <CreateUser />}
          {context.state.chooseClassBool && <PickClass />}
          {context.state.paymentBool && <Payment />}
        </>
      )}
    </PaymentContext.Consumer>
  );
};

export default Display;
