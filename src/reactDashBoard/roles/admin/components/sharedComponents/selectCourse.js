import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormField, Select } from "grommet";
import { HoverContainer } from "../../sharedStyles/sharedStyles";
import InputStatusMessage from "./inputStatusMessage";

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
    courseMessage,
    success,
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
        <InputStatusMessage
          success={success}
          toggle={courseError}
          message={courseMessage}
        />
      </FormField>
    </NewHoverContainer>
  );
};

SelectCourse.defaultProps = {
  courseMessage: "Please select a Course",
  selectedCourse: "",
  courseBool: false,
  courseError: false,
  success: false,
};

SelectCourse.propTypes = {
  courseMessage: PropTypes.string,
  selectedCourse: PropTypes.string,
  courseBool: PropTypes.bool,
  courseError: PropTypes.bool,
  success: PropTypes.bool,
  onSearchCourses: PropTypes.func.isRequired,
  courseSelectChange: PropTypes.func.isRequired,
  courseOptions: PropTypes.instanceOf(Object).isRequired,
};

export default SelectCourse;
