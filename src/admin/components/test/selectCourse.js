import React from "react";
import { FormField, Select } from "grommet";
import { ErrorText } from "./sharedStyles";

const SelectCourse = props => {
  const {
    selectedCourse,
    courseSelectChange,
    onSearchCourses,
    courseOptions,
    courseError,
  } = props;
  return (
    <FormField label="Course">
      <Select
        searchPlaceholder="Search Courses"
        placeholder="Select a Course"
        value={selectedCourse}
        onSearch={searchText => onSearchCourses(searchText)}
        onChange={event => courseSelectChange(event)}
        options={courseOptions}
      />
      <ErrorText
        alignSelf="center"
        margin="xsmall"
        size="medium"
        color="status-critical"
      >
        {courseError && `Please select a Course`}
      </ErrorText>
    </FormField>
  );
};

export default SelectCourse;
