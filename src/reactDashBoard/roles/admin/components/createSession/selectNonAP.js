import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import ErrorText from "./sharedStyles";

const SelectNonAP = props => {
  const { moneySelect, moneyOptions, moneyError, onMoneyChange } = props;
  return (
    <FormField label="Non AP Time">
      <Select
        placeholder="Select Session Type"
        value={moneySelect}
        options={moneyOptions}
        onChange={event => onMoneyChange(event)}
      />
      <ErrorText
        alignSelf="center"
        margin="xsmall"
        size="medium"
        color="status-critical"
      >
        {moneyError && `Please choose an option`}
      </ErrorText>
    </FormField>
  );
};

export default SelectNonAP;
