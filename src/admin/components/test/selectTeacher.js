import React from "react";
import styled from "styled-components";
import { FormField, Select, Text } from "grommet";

const ErrorText = styled(Text)`
  height: 24px;
`;

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
      {/* <Text alignSelf="start" margin="xsmall" size="large">
                      Teacher
                    </Text> */}
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
