import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { HoverContainer } from "../../sharedStyles/sharedStyles";
import InputStatusMessage from "./inputStatusMessage";

const TypeOfClass = props => {
  const {
    selectedType,
    typeOptions,
    typeError,
    typeSelectChange,
    typeLabel,
    typeMessage,
    success,
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
        <InputStatusMessage
          success={success}
          toggle={typeError}
          message={typeMessage}
        />
      </FormField>
    </HoverContainer>
  );
};
TypeOfClass.defaultProps = {
  selectedType: "",
  typeLabel: "default label",
  typeError: false,
  typeOptions: ["option1", "option2"],
  typeMessage: "Please choose an option.",
  success: false,
};
TypeOfClass.propTypes = {
  typeMessage: PropTypes.string,
  selectedType: PropTypes.string,
  typeLabel: PropTypes.string,
  typeSelectChange: PropTypes.func.isRequired,
  typeError: PropTypes.bool,
  typeOptions: PropTypes.instanceOf(Object),
  success: PropTypes.bool,
};
export default TypeOfClass;
