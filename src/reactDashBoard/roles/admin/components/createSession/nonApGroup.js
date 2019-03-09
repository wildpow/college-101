import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Box, Button, Layer, Text } from "grommet";
import {
  Add,
  FormSubtract,
  AddCircle,
  ScheduleNew,
  Trash,
} from "grommet-icons";
import SelectCourse from "../sharedComponents/selectCourse";
import SelectTeacher from "../sharedComponents/selectTeacher";
import StartDate from "../sharedComponents/startDate";
import StartTimePicker from "../sharedComponents/startTimePicker";
// import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
// import SelectNonAP from "./selectNonAP";
import LayerHeader from "../../layerHeader";
import { ALL_FOR_ADMIN } from "../../../../queryComponents/QueryAdminViewAll";
import TypeOfClass from "../sharedComponents/typeOfClass";

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

class NonApGroup extends React.Component {
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
      typeIndex: null,
      selectedType: "",
      typeOptions: [],
      typeError: false,
      typeOptionsObj: [],
    };
  }

  componentDidMount() {
    const { courses, teachers, timeAndPrices } = this.props;
    const teachersNames = [];
    const courseNames = [];
    const teacherIDs = [];
    const courseIDs = [];
    const typeOptions = [];
    const typeOptionsObj = [];
    timeAndPrices.map(t => {
      if (t.groupVsPrivate === "Group") {
        typeOptions.push(t.name);
        typeOptionsObj.push(t);
      }
      return null;
    });
    const date = new Date();
    teachers.map(teacher => {
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    courses.map(course => {
      if (course.apNonAp === "Reg") {
        courseNames.push(course.name);
        courseIDs.push(course.id);
      }
      return null;
    });
    this.setState({
      teacherOptions: teachersNames,
      teachersNamesCopy: teachersNames,
      teacherIDs,
      courseIDs,
      typeOptions,
      typeOptionsObj,
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
      selectedType: "",
      typeError: false,
      courseError: false,
      teacherError: false,
      startTimeError: false,
      typeIndex: null,
      startDate: new Date().toISOString(),
      startDateOpen: false,
    });

  typeSelectChange = event => {
    const { typeOptionsObj, typeOptions } = this.state;
    const typeIndex = typeOptions.indexOf(event.value);
    this.setState({
      selectedType: event.value,
      typeError: false,
      typeIndex,
      maxSizeOfClass: typeOptionsObj[typeIndex].maxStudents,
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
    const { typeOptionsObj, typeIndex } = this.state;
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
      if (typeOptionsObj[typeIndex].time === 60) {
        finalStart.setHours(hour + 1);
        finalStart.setMinutes(minutes);
        finalStart.setSeconds(0);
      }
      if (
        typeOptionsObj[typeIndex].time === 90 ||
        typeOptionsObj[typeIndex].time === 120
      ) {
        const newMin = minutes + typeOptionsObj[typeIndex].time;
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
      typeOptions,
      selectedType,
      typeError,
      selectedCourse,
      selectedTeacher,
      courseError,
      courseOptions,
      teacherOptions,
      teacherError,
      startDate,
      startDateOpen,
      typeIndex,
      maxSizeOfClass,
      startTimeError,
      startTime,
      typeOptionsObj,
      startTimeMessage,
      teachersNamesCopy,
      courseIDs,
      teacherIDs,
      courseNamesCopy,
    } = this.state;
    const { eventTimer, setMessage } = this.props;
    return (
      <Box>
        <Button
          icon={<AddCircle />}
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
                    query: ALL_FOR_ADMIN,
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
                      selectedType.length === 0 ||
                      selectedCourse.length === 0 ||
                      selectedTeacher.length === 0 ||
                      startTime.length === 0
                    ) {
                      this.errorCheck(selectedCourse, "courseError");
                      this.errorCheck(selectedTeacher, "teacherError");
                      this.errorCheck(selectedType, "typeError");
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
                        typeOptionsObj[typeIndex].time,
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
                            timeAndPrice: selectedType,
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
                      <TypeOfClass
                        selectedType={selectedType}
                        typeOptions={typeOptions}
                        typeError={typeError}
                        typeSelectChange={this.typeSelectChange}
                        typeLabel="Non AP Time"
                      />
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
                        {selectedType && (
                          <Text size="large">{`Default Max number of students: ${maxSizeOfClass}`}</Text>
                        )}
                        {selectedType && (
                          <Text size="large">
                            {`Session length: ${
                              typeOptionsObj[typeIndex].time
                            } minutes`}
                          </Text>
                        )}
                        {startTime && selectedType && (
                          <Text size="large">
                            {`
                            Session end time: ${this.convertEndTimeToString(
                              startDate,
                              startTime,
                              typeOptionsObj[typeIndex].time,
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
                        icon={<ScheduleNew />}
                      />
                      <Button
                        icon={<Trash />}
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
                            typeError: false,
                            selectedType: "",
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

export default NonApGroup;
