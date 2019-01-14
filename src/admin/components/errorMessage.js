import React from "react";

const ErrorMessage = props => (
  <>
    The User
    {props.userName}
    <br />
    already exists!
  </>
);

export default ErrorMessage;
