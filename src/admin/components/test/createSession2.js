import React from "react";
import styled from "styled-components";
import { Box, Button, Grommet, Layer, Heading } from "grommet";
import { Add, Close } from "grommet-icons";
import { grommet } from "grommet/themes";
import TimePicker from "./timePicker";
import SelectCourse from "./selectCourse";
import SelectTeacher from "./selectTeacher";
import StartDate from "./startDate";
import EndDate from "./endDate";

const StartTimeContainer = styled(Box)``;
const EndTimeContainer = styled(Box)``;
const TimeWrapper = styled(Box)`
  justify-content: space-evenly;
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
    endDate: undefined,
  };

  componentDidMount() {
    const teachersNames = [];
    const courseNames = [];
    this.props.data.teachers.map(teacher =>
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`),
    );
    this.props.data.courses.map(course => courseNames.push(course.name));

    this.setState({
      teacherOptions: teachersNames,
      teachersNamesCopy: teachersNames,
      courseOptions: courseNames,
      courseNamesCopy: courseNames,
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

  startTimeSelect = date =>
    this.setState({ startDate: date, startDateOpen: false });

  endTimeSelect = date => this.setState({ endDate: date, endDateOpen: false });

  onOpen = () => this.setState({ LayerOpen: true });

  onClose = () => this.setState({ LayerOpen: undefined });

  startOnOpen = () => this.setState({ startDateOpen: true });

  startOnClose = () => this.setState({ startDateOpen: false });

  endOnOpen = () => this.setState({ endDateOpen: true });

  endOnClose = () => this.setState({ endDateOpen: false });

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
      <Grommet theme={grommet}>
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
              <Box
                // gap="medium"
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
                    console.log(selectedTeacher.length);
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
                  return console.log("submit");
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
                  // gap="medium"
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
                  <TimeWrapper
                    direction="row"
                    // justify="between"
                    margin={{ top: "medium" }}
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
                          startTimeSelect={this.startTimeSelect}
                        />
                        <TimePicker />
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
                          endTimeSelect={this.endTimeSelect}
                        />
                        <TimePicker />
                      </Box>
                    </EndTimeContainer>
                  </TimeWrapper>
                </Box>

                <Box
                  direction="row"
                  justify="between"
                  margin={{ top: "medium" }}
                >
                  <Button
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
                  <Button type="submit" label="Add" primary />
                </Box>
              </Box>
            </Layer>
          )}
        </Box>
      </Grommet>
    );
  }
}

export default CreateSession;
