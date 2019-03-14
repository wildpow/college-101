import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const SelectNonAP = props => {
  const { moneySelect, moneyOptions, moneyError, onMoneyChange } = props;
  return (
    <HoverContainer>
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
          {moneyError && `Please choose an option.`}
        </ErrorText>
      </FormField>
    </HoverContainer>
  );
};

SelectNonAP.defaultProps = {
  moneySelect: "",
  moneyOptions: [],
  moneyError: false,
};
SelectNonAP.propTypes = {
  moneySelect: PropTypes.string,
  moneyOptions: PropTypes.instanceOf(Object),
  moneyError: PropTypes.bool,
  onMoneyChange: PropTypes.func.isRequired,
};
export default SelectNonAP;