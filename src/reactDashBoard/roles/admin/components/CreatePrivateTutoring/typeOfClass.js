import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const TypeOfClass = props => {
  const { selectedType, setSessionType, sessionTypeError, typeOptions } = props;

  return (
    <HoverContainer>
      {console.log(props)}
      <FormField label="Type of class">
        <Select
          placeholder="Select Session Type"
          value={selectedType}
          options={typeOptions}
          onChange={event => setSessionType(event)}
        />
        <ErrorText
          alignSelf="center"
          margin="xsmall"
          size="medium"
          color="status-critical"
        >
          {sessionTypeError && "Please choose an option."}
        </ErrorText>
      </FormField>
    </HoverContainer>
  );
};
TypeOfClass.defaultProps = {
  selectedType: "",
  sessionTypeError: false,
  typeOptions: ["option1", "option2"],
};
TypeOfClass.propTypes = {
  selectedType: PropTypes.string,
  setSessionType: PropTypes.func.isRequired,
  sessionTypeError: PropTypes.bool,
  typeOptions: PropTypes.instanceOf(Object),
};
export default TypeOfClass;
