import React from "react";
import PropTypes from "prop-types";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const SelectCourse = props => {
  const {
    selectedCourse,
    courseSelectChange,
    onSearchCourses,
    courses,
    courseError,
  } = props;
  const courseOptions = courses.map(i => i.name);
  return (
    <HoverContainer>
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
    </HoverContainer>
  );
};

SelectCourse.propTypes = {
  selectedCourse: PropTypes.string.isRequired,
  onSearchCourses: PropTypes.func.isRequired,
  courseError: PropTypes.bool.isRequired,
  courseSelectChange: PropTypes.func.isRequired,
  courseOptions: PropTypes.instanceOf(Object).isRequired,
};

export default SelectCourse;
