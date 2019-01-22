import React from "react";
import { FormField, Select } from "grommet";
import { ErrorText } from "./sharedStyles";

const SelectTeacher = props => {
  const {
    selectedTeacher,
    onSearchTeachers,
    teacherOptions,
    teacherError,
    teacherSelectChange,
  } = props;
  return (
    <FormField label="Teacher">
      <Select
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
  );
};

export default SelectTeacher;
