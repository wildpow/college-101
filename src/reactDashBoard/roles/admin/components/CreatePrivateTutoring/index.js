import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { Add, FormSubtract } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "./typeOfClass";
import SelectCourse from "../sharedComponents/selectCourse";
import SelectTeacher from "../sharedComponents/selectTeacher";
import StartDate from "../sharedComponents/startDate";
import StartTimePicker from "../sharedComponents/startTimePicker";
// import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
import convertDateTime from "../../sharedFunctions/convertDateTime";
import { ALL_FOR_ADMIN } from "../../../../queryComponents/QueryAdminViewAll";

const ADD_PRIVATE_TUT = gql`
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
      id
    }
  }
`;
class PrivateTutoring extends React.Component {
  static propTypes = {
    eventTimer: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);
    const { teachers } = this.props;
    this.state = {
      layer: false,
      selectedType: "",
      sessionTypeError: false,
      selectedCourse: "",
      courseError: false,
      courseOptions: [],
      courseNamesCopy: [],
      courseIDs: [],
      selectedTeacher: "",
      teacherOptions: teachers.map(t => `${t.firstName} ${t.lastName}`),
      teachersNamesCopy: teachers.map(t => `${t.firstName} ${t.lastName}`),
      teacherIDs: teachers.map(t => t.id),
      teacherError: false,
      startDate: new Date().toISOString(),
      startDateOpen: false,
      startTime: "",
      startTimeError: false,
      startTimeMessage: "Please enter start time",
      maxSizeOfClass: 0,
      privateIndex: null,
      typeOptions: [],
      typeOptionsObj: [],
      extraTime: false,
      courseBool: true,
    };
  }

  componentDidMount() {
    const { timeAndPrices } = this.props;
    const typeOptions = [];
    const typeOptionsObj = [];
    timeAndPrices.map(p => {
      if (p.groupVsPrivate === "Private") {
        typeOptions.push(p.name);
        typeOptionsObj.push(p);
      }
      return null;
    });
    this.setState({ typeOptions, typeOptionsObj });
  }

  layerToggle = changeAction => {
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        layer: false,
        selectedType: "",
        sessionTypeError: false,
        selectedCourse: "",
        courseError: false,
        teacherError: false,
        selectedTeacher: "",
        startDateOpen: false,
        startDate: new Date().toISOString(),
        startTimeError: false,
        startTime: "",
        privateIndex: null,
        maxSizeOfClass: 0,
        courseBool: true,
        extraTime: false,
      });
    }
  };

  setSessionType = event => {
    const { typeOptions, typeOptionsObj } = this.state;
    const { courses } = this.props;
    const privateIndex = typeOptions.indexOf(event.value);
    const courseOptions = [];
    const courseNamesCopy = [];
    const courseIDs = [];
    courses.map(course => {
      if (event.value === "Private Tutoring") {
        if (course.apNonAp === "Reg") {
          courseIDs.push(course.id);
          courseOptions.push(course.name);
          courseNamesCopy.push(course.name);
        }
      }
      if (event.value === "Private Collage Prep") {
        if (course.apNonAp === "Prep") {
          courseIDs.push(course.id);
          courseOptions.push(course.name);
          courseNamesCopy.push(course.name);
        }
      }
      return null;
    });
    this.setState({
      courseOptions,
      courseNamesCopy,
      courseIDs,
      selectedType: event.value,
      sessionTypeError: false,
      privateIndex,
      courseBool: false,
      maxSizeOfClass: typeOptionsObj[privateIndex].maxStudents,
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

  onSearchCourses = searchText => {
    const { courseNamesCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      courseOptions: courseNamesCopy.filter(o => o.match(regexp)),
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

  startDateToggle = bool => this.setState({ startDateOpen: bool });

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  onChangeStartTime = event => {
    this.setState({
      startTime: event.target.value,
      startTimeError: false,
      startTimeMessage: "Please enter start time",
    });
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

  clearButton = () => {
    this.setState({
      selectedCourse: "",
      selectedTeacher: "",
      startDate: new Date().toISOString(),
      startTime: "",
      startTimeError: false,
      courseError: false,
      teacherError: false,
      sessionTypeError: false,
      selectedType: "",
      privateIndex: null,
      maxSizeOfClass: 0,
      courseBool: true,
      extraTime: false,
    });
  };

  extra30Mintutes = event => {
    this.setState({ extraTime: event.target.checked });
  };

  convertEndTimeToString = (date, time, index, arr, extra) => {
    const endDateTime = convertDateTime(date, time, index, arr, extra);
    return endDateTime.toLocaleTimeString();
  };

  render() {
    const {
      courseBool,
      selectedType,
      layer,
      sessionTypeError,
      selectedCourse,
      courseError,
      courseOptions,
      teacherOptions,
      selectedTeacher,
      teacherError,
      startDate,
      startDateOpen,
      startTimeError,
      startTime,
      startTimeMessage,
      typeOptions,
      privateIndex,
      extraTime,
      teacherIDs,
      courseIDs,
      teachersNamesCopy,
      courseNamesCopy,
      maxSizeOfClass,
      typeOptionsObj,
    } = this.state;
    const { eventTimer, setMessage } = this.props;
    return (
      <Box>
        <Button
          icon={<Add />}
          label="Private Tutoring"
          onClick={() => this.layerToggle(true)}
          primary
        />
        {layer && (
          <Layer
            position="right"
            full="vertical"
            modal
            onClickOutside={() => this.layerToggle(false)}
            onEsc={() => this.layerToggle(false)}
          >
            <LayerHeader
              headingText="Private Tutoring"
              modelFunc={this.layerToggle}
            />
            <Mutation
              mutation={ADD_PRIVATE_TUT}
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
                      this.errorCheck(selectedType, "sessionTypeError");
                      this.errorCheck(startTime, "startTimeError");
                    } else {
                      const date = new Date();
                      const finalStart = convertDateTime(startDate, startTime);
                      const finalEnd = convertDateTime(
                        startDate,
                        startTime,
                        privateIndex,
                        typeOptionsObj,
                        extraTime ? 30 : undefined,
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
                        this.layerToggle(false);
                        eventTimer(true);
                        setMessage("A new private session was added");
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
                        setSessionType={this.setSessionType}
                        sessionTypeError={sessionTypeError}
                        typeOptions={typeOptions}
                      />
                      <SelectCourse
                        courseBool={courseBool}
                        selectedCourse={selectedCourse}
                        courseError={courseError}
                        courseOptions={courseOptions}
                        courseSelectChange={this.courseSelectChange}
                        onSearchCourses={this.onSearchCourses}
                      />
                      <SelectTeacher
                        selectedTeacher={selectedTeacher}
                        onSearchTeachers={this.onSearchTeachers}
                        teacherOptions={teacherOptions}
                        teacherError={teacherError}
                        teacherSelectChange={this.teacherSelectChange}
                      />
                      <StartDate
                        startDateToggle={this.startDateToggle}
                        startDate={startDate}
                        startDateSelect={this.startDateSelect}
                        startDateOpen={startDateOpen}
                      />
                      <StartTimePicker
                        startTimeError={startTimeError}
                        startTime={startTime}
                        startTimeMessage={startTimeMessage}
                        onChangeStartTime={this.onChangeStartTime}
                      />
                      <Box direction="column" gap="small">
                        <CheckBox
                          checked={extraTime}
                          label="Add extra 30 minutes?"
                          onChange={event => this.extra30Mintutes(event)}
                        />
                        {extraTime !== true ? (
                          <>
                            {startTime && selectedType && (
                              <>
                                <Text size="large">
                                  {`
                            Session end time: ${this.convertEndTimeToString(
                              startDate,
                              startTime,
                              privateIndex,
                              typeOptionsObj,
                            )}`}
                                </Text>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {startTime && selectedType && (
                              <>
                                <Text size="large">
                                  {`
                            Session end time: ${this.convertEndTimeToString(
                              startDate,
                              startTime,
                              privateIndex,
                              typeOptionsObj,
                              30,
                            )}`}
                                </Text>
                              </>
                            )}
                          </>
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
                        onClick={this.clearButton}
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

export default PrivateTutoring;
