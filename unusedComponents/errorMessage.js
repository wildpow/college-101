import React from "react";

const ErrorMessage = props => {
  const { errorMessage } = props;
  if (errorMessage === undefined) return "";
  if (errorMessage.length > 0) return `${errorMessage}`;
  return null;
};

export default ErrorMessage;
