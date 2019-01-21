import React from "react";
import { addDays } from "date-fns";
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
import { Add, Close, FormSubtract } from "grommet-icons";
// import { grommet } from "grommet/themes";
import EndTime from "./endTime";
import SelectCourse from "./selectCourse";
import SelectTeacher from "./selectTeacher";
import StartDate from "./startDate";
import EndDate from "./endDate";
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

const StartTimeContainer = styled(Box)``;
const EndTimeContainer = styled(Box)``;
const TimeWrapper = styled(Box)`
  justify-content: space-evenly;
`;
const BLA = styled(Box)`
  div {
    border-bottom: 0px solid black !important;
    border: none !important;
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
    endDateOpen: false,
    endDate: new Date(),
    maxSizeOfClass: 1,
    startTime: "",
    endTime: "",
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
      endDate: date.toISOString(),
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

  endDateSelect = date => this.setState({ endDate: date, endDateOpen: false });

  onOpen = () => this.setState({ LayerOpen: true });

  onClose = () => this.setState({ LayerOpen: undefined });

  startOnOpen = () => this.setState({ startDateOpen: true });

  startOnClose = () => this.setState({ startDateOpen: false });

  endOnOpen = () => this.setState({ endDateOpen: true });

  endOnClose = () => this.setState({ endDateOpen: false });

  onChangeStartTime = event => this.setState({ startTime: event.target.value });

  onChangeEndTime = event => this.setState({ endTime: event.target.value });

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
      endDateOpen,
      endDate,
      maxSizeOfClass,
      startTime,
      endTime,
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
        {/* {console.log("props", this.props)} */}
        {/* {console.log("option", teacherOptions)}
        {console.log("userNames", teacherUserName)} */}
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
                        selectedCourse.length === 0 &&
                        selectedTeacher.length === 0
                      ) {
                        this.setState({
                          teacherError: true,
                          courseError: true,
                        });
                        return null;
                      }
                      if (selectedTeacher.length === 0) {
                        this.setState({
                          teacherError: true,
                        });
                        return null;
                      }
                      if (selectedCourse.length === 0) {
                        this.setState({
                          courseError: true,
                        });
                        return null;
                      }
                      const teacherId =
                        teacherIDs[teachersNamesCopy.indexOf(selectedTeacher)];
                      const courseId =
                        courseIDs[courseNamesCopy.indexOf(selectedCourse)];
                      const finalStart = this.convertDateTime(
                        startDate,
                        startTime,
                      );
                      const FinalEnd = this.convertDateTime(endDate, endTime);
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
                    }}
                  >
                    <Box flex={false} direction="row" justify="between">
                      <Heading level={2} margin="none">
                        Add Session
                      </Heading>
                      <Button icon={<Close />} onClick={this.onClose} />
                    </Box>
                    <Box
                      flex="grow"
                      overflow="auto"
                      pad={{ vertical: "small" }}
                      gap="small"
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
                      {console.log(startDate)}
                      <TimeWrapper
                        direction="row"
                        // justify="between"
                        // margin={{ top: "medium" }}
                        flex={false}
                      >
                        <StartTimeContainer align="start" direction="column">
                          <Heading alignSelf="center" margin="xsmall" level={4}>
                            Start Time
                          </Heading>
                          <Box margin="small">
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
                            />
                          </Box>
                        </StartTimeContainer>
                        <EndTimeContainer align="start" direction="column">
                          <Heading alignSelf="center" margin="xsmall" level={4}>
                            End Time
                          </Heading>
                          <Box margin="small">
                            <EndDate
                              endDateOpen={endDateOpen}
                              endOnOpen={this.endOnOpen}
                              endOnClose={this.endOnClose}
                              endDate={endDate}
                              endDateSelect={this.endDateSelect}
                            />
                            <EndTime
                              endTime={endTime}
                              onChangeEndTime={this.onChangeEndTime}
                            />
                          </Box>
                        </EndTimeContainer>
                      </TimeWrapper>
                      <BLA margin={{ right: "small", left: "small" }}>
                        <Heading alignSelf="center" margin="small" level={4}>
                          Max Number of student in this session?
                        </Heading>
                        <FormField name="max">
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
                      </BLA>
                    </Box>
                    <Box
                      direction="row"
                      justify="between"
                      // margin={{ top: "xsmall" }}
                    >
                      <Button
                        icon={<FormSubtract />}
                        label="Clear"
                        onClick={() =>
                          this.setState({
                            selectedCourse: "",
                            selectedTeacher: "",
                            endDate: undefined,
                            startDate: undefined,
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
