import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormField, Select } from "grommet";
import { ErrorText, HoverContainer } from "../../sharedStyles/sharedStyles";

const NewHoverContainer = styled(HoverContainer)`
  div div button div div svg {
    transition: all 250ms ease-in-out;
    :hover {
      stroke: ${props => (props.courseBool ? "#01a982" : "black")};
    }
  }
  div div button {
    transition: all 250ms ease-in-out;
    border: 1px solid transparent;
    :hover {
      border: ${props =>
        props.courseBool ? "1px solid transparent" : "1px solid #6aac5c"};
    }
  }
`;
const SelectCourse = props => {
  const {
    selectedCourse,
    courseSelectChange,
    onSearchCourses,
    courseOptions,
    courseError,
    courseBool,
  } = props;
  return (
    <NewHoverContainer courseBool={courseBool}>
      <FormField label="Course">
        <Select
          disabled={courseBool}
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
    </NewHoverContainer>
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
