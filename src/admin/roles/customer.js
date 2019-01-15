import React from "react";

const Customer = props => {
  const { userloggin } = props.data;
  if (userloggin === null) return <h1>Create new customer info</h1>;
  return (
    <>
      <h1>Customer View</h1>
    </>
  );
};

export default Customer;
