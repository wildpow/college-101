import React from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Box, Button, Layer, Heading, RangeInput, FormField } from "grommet";
import { Add, FormClose, FormSubtract } from "grommet-icons";
import EndTime from "./endTime";
import SelectCourse from "./selectCourse";
import SelectTeacher from "./selectTeacher";
import StartDate from "./startDate";
import StartTimePicker from "./startTimePicker";
import { TitleWrapper } from "../../sharedStyles/slideLayer";
import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
import SelectNonAP from "./selectNonAP";

const HoverContainer = styled(Box)`
  div div button div div svg {
    transition: all 250ms ease-in-out;
    :hover {
      stroke: black;
    }
  }
  div div button {
    transition: all 250ms ease-in-out;
    border: 1px solid transparent;
    :hover {
      border: 1px solid #6aac5c;
    }
  }
`;
const HoverBorder = styled(Box)`
  transition: all 250ms ease-in-out;
  div {
    :nth-of-type(2) {
      :hover {
        border-bottom: 1px solid #6aac5c !important;
      }
    }
  }
`;

const ADD_SESSION = gql`
  mutation(
    $startTime: DateTime!
    $endTime: DateTime!
    $maxSizeOfClass: Int!
    $courseId: ID
    $teacherId: ID
    $timeAndPrice: String
  ) {
    createSession(
      data: {
        startTime: $startTime
        endTime: $endTime
        maxSizeOfClass: $maxSizeOfClass
        status: PUBLISHED
        teacher: { connect: { id: $teacherId } }
        course: { connect: { id: $courseId } }
        timeAndPrice: { connect: { name: $timeAndPrice } }
      }
    ) {
      startTime
      endTime
    }
  }
`;

class CreateSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerOpen: false,
      selectedTeacher: "",
      teacherOptions: [],
      teachersNamesCopy: [],
      teacherIDs: [],
      courseOptions: [],
      courseNamesCopy: [],
      courseIDs: [],
      selectedCourse: "",
      teacherError: false,
      courseError: false,
      startDateOpen: false,
      startDate: new Date().toISOString(),
      maxSizeOfClass: 8,
      startTime: "",
      startTimeError: false,
      endTime: "",
      endTimeError: false,

      moneySelect: "",
      moneyOptions: [],
      moneyError: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const teachersNames = [];
    const courseNames = [];
    const teacherIDs = [];
    const courseIDs = [];
    const moneyOptions = data.timeAndPrices.map(t => t.name);
    const date = new Date();
    data.teachers.map(teacher => {
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    data.courses.map(course => {
      courseNames.push(course.name);
      courseIDs.push(course.id);
      return null;
    });
    this.setState({
      teacherOptions: teachersNames,
      teachersNamesCopy: teachersNames,
      teacherIDs,
      courseIDs,
      moneyOptions,
      courseOptions: courseNames,
      courseNamesCopy: courseNames,
      startDate: date.toISOString(),
    });
  }

  errorCheck = (value, errorState) => {
    if (value.length === 0) {
      this.setState({
        [`${errorState}`]: true,
      });
      return null;
    }
    return null;
  };

  onOpen = () => this.setState({ layerOpen: true });

  onClose = () =>
    this.setState({
      layerOpen: false,
      startTime: "",
      endTime: "",
      selectedCourse: "",
      selectedTeacher: "",
      maxSizeOfClass: 8,
      moneySelect: "",
      moneyError: false,
      courseError: false,
      teacherError: false,
    });

  onMoneyChange = event => {
    this.setState({
      moneySelect: event.value,
      moneyError: false,
    });
  };

  courseSelectChange = event => {
    const { courseNamesCopy } = this.state;
    this.setState({
      selectedCourse: event.value,
      courseOptions: courseNamesCopy,
      courseError: false,
    });
  };

  teacherSelectChange = event => {
    const { teachersNamesCopy } = this.state;
    this.setState({
      selectedTeacher: event.value,
      teacherOptions: teachersNamesCopy,
      teacherError: false,
    });
  };

  onSearchTeachers = searchText => {
    const { teachersNamesCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      teacherOptions: teachersNamesCopy.filter(o => o.match(regexp)),
    });
  };

  onSearchCourses = searchText => {
    const { courseNamesCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      courseOptions: courseNamesCopy.filter(o => o.match(regexp)),
    });
  };

  render() {
    const {
      layerOpen,
      moneyOptions,
      moneySelect,
      moneyError,
      selectedCourse,
      selectedTeacher,
      courseError,
      courseOptions,
      teacherOptions,
      teacherError,
    } = this.state;
    return (
      <Box fill align="end" justify="end">
        <Button
          icon={<Add />}
          label="Add Session"
          onClick={this.onOpen}
          primary
        />
        {layerOpen && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <TitleWrapper
              background="#61a785"
              flex={false}
              direction="row"
              justify="between"
              elevation="xlarge"
              pad={{
                left: "medium",
                right: "medium",
                top: "xsmall",
                bottom: "xsmall",
              }}
            >
              <Heading level={2} margin="none" color="floralwhite">
                Add Session
              </Heading>
              <Button
                icon={<FormClose color="floralwhite" size="large" />}
                onClick={this.onClose}
              />
            </TitleWrapper>
            <Mutation
              mutation={ADD_SESSION}
              refetchQueries={() => {
                return [
                  {
                    query: ALL_SESSIONS,
                  },
                ];
              }}
            >
              {createSession => (
                <Box
                  gap="small"
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  pad="medium"
                  as="form"
                  onSubmit={event => {
                    event.preventDefault();

                    if (
                      moneySelect.length === 0 ||
                      selectedCourse.length === 0 ||
                      selectedTeacher.length === 0
                    ) {
                      this.errorCheck(selectedCourse, "courseError");
                      this.errorCheck(selectedTeacher, "teacherError");
                      this.errorCheck(moneySelect, "moneyError");
                    }
                  }}
                >
                  <Box
                    fill
                    overflow="scroll"
                    pad={{ vertical: "small" }}
                    gap="small"
                    justify="between"
                  >
                    <Box>
                      <HoverContainer>
                        <SelectNonAP
                          moneySelect={moneySelect}
                          moneyOptions={moneyOptions}
                          moneyError={moneyError}
                          onMoneyChange={this.onMoneyChange}
                        />
                      </HoverContainer>
                      <HoverContainer>
                        <SelectCourse
                          selectedCourse={selectedCourse}
                          courseSelectChange={this.courseSelectChange}
                          onSearchCourses={this.onSearchCourses}
                          courseOptions={courseOptions}
                          courseError={courseError}
                        />
                      </HoverContainer>
                      <HoverContainer>
                        <SelectTeacher
                          selectedTeacher={selectedTeacher}
                          teacherSelectChange={this.teacherSelectChange}
                          onSearchTeachers={this.onSearchTeachers}
                          teacherOptions={teacherOptions}
                          teacherError={teacherError}
                        />
                      </HoverContainer>
                    </Box>
                    <Button type="submit" label="Add" primary icon={<Add />} />
                  </Box>
                </Box>
              )}
            </Mutation>
          </Layer>
        )}
      </Box>
    );
  }
}

export default CreateSession;
