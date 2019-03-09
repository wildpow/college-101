import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const SelectTeacher = props => {
  const {
    selectedTeacher,
    onSearchTeachers,
    teacherOptions,
    teacherError,
    teacherSelectChange,
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
        <ErrorText
          alignSelf="center"
          margin="xsmall"
          size="medium"
          color="status-critical"
        >
          {teacherError && `Please select a Teacher`}
        </ErrorText>
      </FormField>
    </HoverContainer>
  );
};

SelectTeacher.propTypes = {
  teacherError: PropTypes.bool.isRequired,
  onSearchTeachers: PropTypes.func.isRequired,
  selectedTeacher: PropTypes.string.isRequired,
  teacherOptions: PropTypes.instanceOf(Object).isRequired,
  teacherSelectChange: PropTypes.func.isRequired,
};

export default SelectTeacher;
