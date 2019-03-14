import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const TypeOfClass = props => {
  const { typeSelect, setSessionType, sessionTypeError, typeList } = props;

  return (
    <HoverContainer>
      <FormField label="Type of class">
        <Select
          placeholder="Select Session Type"
          value={typeSelect}
          options={typeList}
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
  typeSelect: "",
  sessionTypeError: false,
  typeList: ["option1", "option2"],
};
TypeOfClass.propTypes = {
  typeSelect: PropTypes.string,
  setSessionType: PropTypes.func.isRequired,
  sessionTypeError: PropTypes.bool,
  typeList: PropTypes.instanceOf(Object),
};
export default TypeOfClass;