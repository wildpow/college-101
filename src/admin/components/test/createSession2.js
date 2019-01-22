import React from "react";
import styled from "styled-components";
import { hpe } from "grommet-theme-hpe";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import {
  Box,
  Button,
  Grommet,
  Layer,
  Heading,
  RangeInput,
  FormField,
} from "grommet";
import { Add, FormClose, FormSubtract } from "grommet-icons";
// import { grommet } from "grommet/themes";
import EndTime from "./endTime";
import SelectCourse from "./selectCourse";
import SelectTeacher from "./selectTeacher";
import StartDate from "./startDate";
import StartTimePicker from "./startTimePicker";

const ADD_SESSION = gql`
  mutation(
    $startTime: DateTime!
    $endTime: DateTime!
    $maxSizeOfClass: Int!
    $courseId: ID
    $teacherId: ID
  ) {
    createSession(
      data: {
        startTime: $startTime
        endTime: $endTime
        maxSizeOfClass: $maxSizeOfClass
        status: PUBLISHED
        teacher: { connect: { id: $teacherId } }
        course: { connect: { id: $courseId } }
      }
    ) {
      startTime
      endTime
    }
  }
`;
const TitleWrapper = styled(Box)`
  button {
    /* padding-bottom: 0px;
    padding-top: 0px; */
    padding: 0;
  }
  h2 {
    align-self: center;
  }
  button svg:hover {
    transition: all 250ms ease-in-out;
    stroke: black;
    fill: black;
  }
`;
const MaxStudentWrapper = styled(Box)`
  div {
    border-bottom: 0px solid black !important;
    border: none !important;
    margin-bottom: 0; // PPPP
  }
  h1 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  div div {
    margin-bottom: 6px;
  }
`;
class CreateSession extends React.Component {
  state = {
    LayerOpen: false,
    selectedTeacher: "",
    teacherOptions: [],
    teachersNamesCopy: [],
    courseOptions: [],
    courseNamesCopy: [],
    selectedCourse: "",
    teacherError: false,
    courseError: false,
    startDateOpen: false,
    startDate: undefined,
    maxSizeOfClass: 1,
    startTime: "",
    startTimeError: false,
    endTime: "",
    endTimeError: false,
  };

  componentDidMount() {
    const { data } = this.props;
    const teachersNames = [];
    const courseNames = [];
    const date = new Date();
    data.teachers.map(teacher =>
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`),
    );
    data.courses.map(course => courseNames.push(course.name));
    this.setState({
      teacherOptions: teachersNames,
      teachersNamesCopy: teachersNames,
      courseOptions: courseNames,
      courseNamesCopy: courseNames,
      startDate: date.toISOString(),
    });
  }

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

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  onOpen = () => this.setState({ LayerOpen: true });

  onClose = () =>
    this.setState({
      LayerOpen: undefined,
      startTime: "",
      endTime: "",
      selectedCourse: "",
      selectedTeacher: "",
      maxSizeOfClass: 1,
    });

  startOnOpen = () => this.setState({ startDateOpen: true });

  startOnClose = () => this.setState({ startDateOpen: false });

  onChangeStartTime = event =>
    this.setState({ startTime: event.target.value, startTimeError: false });

  onChangeEndTime = event =>
    this.setState({ endTime: event.target.value, endTimeError: false });

  convertDateTime = (date, time) => {
    const finalStart = new Date(date);
    let hour = 0;
    let minutes = 0;
    if (time.indexOf("a") === -1) {
      hour += 12;
    }
    if (Number(time[0]) === 1) {
      hour += Number(`${time[0]}${time[1]}`);
      minutes += Number(`${time[3]}${time[4]}`);
    } else {
      hour += Number(time[0]);
      minutes += Number(`${time[2]}${time[3]}`);
    }
    finalStart.setHours(hour);
    finalStart.setMinutes(minutes);
    finalStart.setSeconds(0);

    return finalStart;
  };

  errorCheck = (value, errorState) => {
    if (value.length === 0) {
      this.setState({
        [`${errorState}`]: true,
      });
      return null;
    }
    return null;
  };

  render() {
    const {
      LayerOpen,
      teacherOptions,
      selectedTeacher,
      courseOptions,
      selectedCourse,
      teacherError,
      courseError,
      startDateOpen,
      startDate,
      maxSizeOfClass,
      startTime,
      endTime,
      startTimeError,
      endTimeError,
    } = this.state;
    const { data } = this.props;
    const teachersNamesCopy = [];
    const teacherIDs = [];
    data.teachers.map(teacher => {
      teachersNamesCopy.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    const courseNamesCopy = [];
    const courseIDs = [];
    data.courses.map(course => {
      courseNamesCopy.push(course.name);
      courseIDs.push(course.id);
      return null;
    });
    return (
      <Grommet theme={hpe}>
        <Box fill align="center" justify="center">
          <Button icon={<Add />} label="Add Session" onClick={this.onOpen} />
          {LayerOpen && (
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
              <Mutation mutation={ADD_SESSION}>
                {createSession => (
                  <Box
                    // gap="small"
                    as="form"
                    fill="vertical"
                    overflow="auto"
                    width="medium"
                    pad="medium"
                    onSubmit={event => {
                      event.preventDefault();
                      if (
                        selectedCourse.length === 0 ||
                        selectedTeacher.length === 0 ||
                        startTime.length === 0 ||
                        endTime.length === 0
                      ) {
                        this.errorCheck(startTime, "startTimeError");
                        this.errorCheck(endTime, "endTimeError");
                        this.errorCheck(selectedCourse, "courseError");
                        this.errorCheck(selectedTeacher, "teacherError");
                      } else {
                        const teacherId =
                          teacherIDs[
                            teachersNamesCopy.indexOf(selectedTeacher)
                          ];
                        const courseId =
                          courseIDs[courseNamesCopy.indexOf(selectedCourse)];
                        const finalStart = this.convertDateTime(
                          startDate,
                          startTime,
                        );
                        const FinalEnd = this.convertDateTime(
                          startDate,
                          endTime,
                        );
                        createSession({
                          variables: {
                            startTime: finalStart,
                            endTime: FinalEnd,
                            teacherId,
                            courseId,
                            maxSizeOfClass,
                          },
                        });
                        this.onClose();
                        return null;
                      }
                    }}
                  >
                    {/* <Box flex={false} direction="row" justify="between">
                      <Heading level={2} margin="none">
                        Add Session
                      </Heading>
                      <Button icon={<Close />} onClick={this.onClose} />
                    </Box> */}
                    <Box
                      flex="grow"
                      overflow="auto"
                      // pad={{ vertical: "small" }}
                      gap="xsmall"
                    >
                      <SelectCourse
                        selectedCourse={selectedCourse}
                        courseSelectChange={this.courseSelectChange}
                        onSearchCourses={this.onSearchCourses}
                        courseOptions={courseOptions}
                        courseError={courseError}
                      />
                      <SelectTeacher
                        selectedTeacher={selectedTeacher}
                        teacherSelectChange={this.teacherSelectChange}
                        onSearchTeachers={this.onSearchTeachers}
                        teacherOptions={teacherOptions}
                        teacherError={teacherError}
                      />
                      <StartDate
                        startDateOpen={startDateOpen}
                        startOnOpen={this.startOnOpen}
                        startOnClose={this.startOnClose}
                        startDate={startDate}
                        startDateSelect={this.startDateSelect}
                      />
                      <StartTimePicker
                        startTime={startTime}
                        onChangeStartTime={this.onChangeStartTime}
                        startTimeError={startTimeError}
                      />
                      <EndTime
                        endTime={endTime}
                        onChangeEndTime={this.onChangeEndTime}
                        endTimeError={endTimeError}
                      />
                      <MaxStudentWrapper>
                        <FormField
                          name="max"
                          label="Max Number of student in this session?"
                        >
                          <RangeInput
                            onChange={event =>
                              this.setState({
                                maxSizeOfClass: Number(event.target.value),
                              })
                            }
                            min={1}
                            max={25}
                            value={maxSizeOfClass}
                          />
                          <Box
                            direction="row"
                            align="center"
                            alignSelf="center"
                          >
                            <Heading level={1}>{maxSizeOfClass}</Heading>
                          </Box>
                        </FormField>
                      </MaxStudentWrapper>
                    </Box>
                    <Box
                      direction="row"
                      justify="between"
                      // margin={{ bottom: "small" }}
                    >
                      <Button
                        icon={<FormSubtract />}
                        label="Clear"
                        onClick={() =>
                          this.setState({
                            selectedCourse: "",
                            selectedTeacher: "",
                            startDate: undefined,
                            startTime: "",
                            endTime: "",
                            endTimeError: false,
                            startTimeError: false,
                            courseError: false,
                            teacherError: false,
                          })
                        }
                      />
                      <Button
                        type="submit"
                        label="Add"
                        primary
                        icon={<Add />}
                      />
                    </Box>
                  </Box>
                )}
              </Mutation>
            </Layer>
          )}
        </Box>
      </Grommet>
    );
  }
}

export default CreateSession;
