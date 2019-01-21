import React from "react";
import styled from "styled-components";
import { FormField, Select, Text } from "grommet";

const ErrorText = styled(Text)`
  height: 24px;
`;

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
