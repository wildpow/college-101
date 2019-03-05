import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Box, Button, Layer, Text } from "grommet";
import { Add, FormSubtract } from "grommet-icons";
// import EndTime from "./endTime";
import SelectCourse from "./selectCourse";
import SelectTeacher from "./selectTeacher";
import StartDate from "./startDate";
import StartTimePicker from "./startTimePicker";
import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
import SelectNonAP from "./selectNonAP";
import LayerHeader from "../../layerHeader";

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
  static propTypes = {
    eventTimer: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
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
      maxSizeOfClass: 0,
      startTime: "",
      startTimeError: false,
      startTimeMessage: "Please enter start time",
      // endTime: "",
      // endTimeError: false,
      moneySelectIndex: null,
      moneySelect: "",
      moneyOptions: [],
      moneyError: false,
      money: [],
    };
  }

  componentDidMount() {
    const { courses, teachers, timeAndPrices } = this.props;
    const teachersNames = [];
    const courseNames = [];
    const teacherIDs = [];
    const courseIDs = [];
    const moneyOptions = [];
    const money = [];
    timeAndPrices.map(t => {
      moneyOptions.push(t.name);
      money.push(t);
      return null;
    });
    const date = new Date();
    teachers.map(teacher => {
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    courses.map(course => {
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
      money,
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

  startDateToggle = bool => this.setState({ startDateOpen: bool });

  // startOnClose = () => this.setState({ startDateOpen: false });

  onChangeStartTime = event => {
    this.setState({
      startTime: event.target.value,
      startTimeError: false,
      startTimeMessage: "Please enter start time",
    });
  };

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  onOpen = () => this.setState({ layerOpen: true });

  onClose = () =>
    this.setState({
      layerOpen: false,
      startTime: "",
      // endTime: "",
      selectedCourse: "",
      selectedTeacher: "",
      maxSizeOfClass: 0,
      moneySelect: "",
      moneyError: false,
      courseError: false,
      teacherError: false,
      startTimeError: false,
      moneySelectIndex: null,
      startDate: new Date().toISOString(),
      startDateOpen: false,
    });

  onMoneyChange = event => {
    const { money, moneyOptions } = this.state;
    const moneySelectIndex = moneyOptions.indexOf(event.value);
    this.setState({
      moneySelect: event.value,
      moneyError: false,
      moneySelectIndex,
      maxSizeOfClass: money[moneySelectIndex].maxStudents,
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

  onMaxChange = event => {
    this.setState({ maxSizeOfClass: Number(event.target.value) });
  };

  convertEndTimeToString = (date, time, add) => {
    const endDateTime = this.convertDateTime(date, time, add);
    return endDateTime.toLocaleTimeString();
  };

  convertDateTime = (date, time, add = null) => {
    console.log("date", date, "time", time);
    const { money, moneySelectIndex } = this.state;
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
    if (add === null) {
      finalStart.setHours(hour);
      finalStart.setMinutes(minutes);
      finalStart.setSeconds(0);
    } else {
      if (money[moneySelectIndex].time === 60) {
        finalStart.setHours(hour + 1);
        finalStart.setMinutes(minutes);
        finalStart.setSeconds(0);
      }
      if (
        money[moneySelectIndex].time === 90 ||
        money[moneySelectIndex].time === 120
      ) {
        const newMin = minutes + money[moneySelectIndex].time;
        const newHours = Math.floor(newMin / 60);
        const remander = newMin % 60;
        finalStart.setHours(hour + newHours);
        finalStart.setMinutes(remander);
        finalStart.setSeconds(0);
      }
    }
    return finalStart;
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
      startDate,
      startDateOpen,
      moneySelectIndex,
      maxSizeOfClass,
      startTimeError,
      startTime,
      money,
      startTimeMessage,
      teachersNamesCopy,
      courseIDs,
      teacherIDs,
      courseNamesCopy,
    } = this.state;
    const { eventTimer, setMessage } = this.props;
    return (
      <Box>
        {/* {console.log(this.state)} */}
        <Button
          icon={<Add />}
          label="Sm. Group NonAP"
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
            <LayerHeader headingText="Add Session" modelFunc={this.onClose} />
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
                      selectedTeacher.length === 0 ||
                      startTime.length === 0
                    ) {
                      this.errorCheck(selectedCourse, "courseError");
                      this.errorCheck(selectedTeacher, "teacherError");
                      this.errorCheck(moneySelect, "moneyError");
                      this.errorCheck(startTime, "startTimeError");
                    } else {
                      const date = new Date();

                      const finalStart = this.convertDateTime(
                        startDate,
                        startTime,
                      );
                      const finalEnd = this.convertDateTime(
                        startDate,
                        startTime,
                        money[moneySelectIndex].time,
                      );
                      if (date > finalStart) {
                        this.setState({
                          startTimeMessage:
                            "Can not create a class in the past",
                          startTimeError: true,
                        });
                      } else {
                        const teacherId =
                          teacherIDs[
                            teachersNamesCopy.indexOf(selectedTeacher)
                          ];
                        const courseId =
                          courseIDs[courseNamesCopy.indexOf(selectedCourse)];
                        createSession({
                          variables: {
                            startTime: finalStart,
                            endTime: finalEnd,
                            teacherId,
                            courseId,
                            maxSizeOfClass,
                            timeAndPrice: moneySelect,
                          },
                        });
                        this.onClose();
                        eventTimer(true);
                        setMessage("A new session was added");
                        return null;
                      }
                    }

                    return null;
                  }}
                >
                  <Box fill overflow="scroll" justify="between">
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
                      <StartTimePicker
                        startTime={startTime}
                        onChangeStartTime={this.onChangeStartTime}
                        startTimeError={startTimeError}
                        startTimeMessage={startTimeMessage}
                      />

                      <StartDate
                        startDateOpen={startDateOpen}
                        startDateToggle={this.startDateToggle}
                        startDate={startDate}
                        startDateSelect={this.startDateSelect}
                      />

                      <Box direction="column" gap="small">
                        {moneySelect && (
                          <Text size="large">{`Default Max number of students: ${maxSizeOfClass}`}</Text>
                        )}
                        {moneySelect && (
                          <Text size="large">
                            {`Session length: ${
                              money[moneySelectIndex].time
                            } minutes`}
                          </Text>
                        )}
                        {startTime && moneySelect && (
                          <Text size="large">
                            {`
                            Session end time: ${this.convertEndTimeToString(
                              startDate,
                              startTime,
                              money[moneySelectIndex].time,
                            )}`}
                          </Text>
                        )}
                      </Box>
                    </Box>
                    <Box
                      direction="row"
                      justify="between"
                      pad={{ horizontal: "xsmall", vertical: "xsmall" }}
                    >
                      <Button
                        type="submit"
                        label="ADD"
                        primary
                        icon={<Add />}
                      />
                      <Button
                        icon={<FormSubtract />}
                        label="CLEAR"
                        onClick={() =>
                          this.setState({
                            selectedCourse: "",
                            selectedTeacher: "",
                            startDate: undefined,
                            startTime: "",
                            // endTime: "",
                            // endTimeError: false,
                            startTimeError: false,
                            courseError: false,
                            teacherError: false,
                            moneyError: false,
                            moneySelect: "",
                          })
                        }
                      />
                    </Box>
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
