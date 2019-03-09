import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const TypeOfClass = props => {
  const {
    selectedType,
    typeOptions,
    typeError,
    typeSelectChange,
    typeLabel,
  } = props;

  return (
    <HoverContainer>
      <FormField label={typeLabel}>
        <Select
          placeholder="Select Session Type"
          value={selectedType}
          options={typeOptions}
          onChange={event => typeSelectChange(event)}
        />
        <ErrorText
          alignSelf="center"
          margin="xsmall"
          size="medium"
          color="status-critical"
        >
          {typeError && "Please choose an option."}
        </ErrorText>
      </FormField>
    </HoverContainer>
  );
};
TypeOfClass.defaultProps = {
  selectedType: "",
  typeLabel: "default label",
  typeError: false,
  typeOptions: ["option1", "option2"],
};
TypeOfClass.propTypes = {
  selectedType: PropTypes.string,
  typeLabel: PropTypes.string,
  typeSelectChange: PropTypes.func.isRequired,
  typeError: PropTypes.bool,
  typeOptions: PropTypes.instanceOf(Object),
};
export default TypeOfClass;
