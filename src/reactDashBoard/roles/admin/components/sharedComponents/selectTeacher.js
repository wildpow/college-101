import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { HoverContainer } from "../../sharedStyles/sharedStyles";
import InputStatusMessage from "./inputStatusMessage";

const SelectTeacher = props => {
  const {
    selectedTeacher,
    onSearchTeachers,
    teacherOptions,
    teacherError,
    teacherSelectChange,
    success,
    teacherMessage,
  } = props;
  return (
    <HoverContainer>
      <FormField label="Teacher">
        <Select
          searchPlaceholder="Search Teachers"
          placeholder="Select a Teacher"
          value={selectedTeacher}
          onSearch={searchText => onSearchTeachers(searchText)}
          onChange={event => teacherSelectChange(event)}
          options={teacherOptions}
        />
        <InputStatusMessage
          success={success}
          toggle={teacherError}
          message={teacherMessage}
        />
      </FormField>
    </HoverContainer>
  );
};

SelectTeacher.defaultProps = {
  teacherError: false,
  success: false,
  teacherMessage: "Please select a Teacher.",
};

SelectTeacher.propTypes = {
  success: PropTypes.bool,
  teacherMessage: PropTypes.string,
  teacherError: PropTypes.bool,
  onSearchTeachers: PropTypes.func.isRequired,
  selectedTeacher: PropTypes.string.isRequired,
  teacherOptions: PropTypes.instanceOf(Object).isRequired,
  teacherSelectChange: PropTypes.func.isRequired,
};

export default SelectTeacher;
