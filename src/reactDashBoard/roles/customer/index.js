import React from "react";
import PropTypes from "prop-types";

const Customer = props => {
  const { data } = props;
  if (data.userloggin === null) return <h1>Create new customer info</h1>;
  return (
    <>
      <h1>Customer View</h1>
    </>
  );
};

Customer.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
export default Customer;
