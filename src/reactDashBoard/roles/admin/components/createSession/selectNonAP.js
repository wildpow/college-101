import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const SelectNonAP = props => {
  const { selectedType, typeOptions, typeError, onTypeChange } = props;
  return (
    <HoverContainer>
      <FormField label="Non AP Time">
        <Select
          placeholder="Select Session Type"
          value={selectedType}
          options={typeOptions}
          onChange={event => onTypeChange(event)}
        />
        <ErrorText
          alignSelf="center"
          margin="xsmall"
          size="medium"
          color="status-critical"
        >
          {typeError && `Please choose an option.`}
        </ErrorText>
      </FormField>
    </HoverContainer>
  );
};

SelectNonAP.defaultProps = {
  selectedType: "",
  typeOptions: [],
  typeError: false,
};
SelectNonAP.propTypes = {
  selectedType: PropTypes.string,
  typeOptions: PropTypes.instanceOf(Object),
  typeError: PropTypes.bool,
  onTypeChange: PropTypes.func.isRequired,
};
export default SelectNonAP;
