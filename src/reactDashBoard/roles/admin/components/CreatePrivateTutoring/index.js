import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text } from "grommet";
import { Add, FormSubtract } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "./typeOfClass";
import SelectCourse from "../sharedComponents/selectCourse";
import SelectTeacher from "../sharedComponents/selectTeacher";
import StartDate from "../sharedComponents/startDate";
import StartTimePicker from "../sharedComponents/startTimePicker";
import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
import convertDateTime from "../../sharedFunctions/convertDateTime";

const ADD_PRIVATE_TUT = gql`
  mutation(
    $startTime: DateTime!
    $endTime: DateTime!
    $maxSizeOfClass: Int!
    $courseId: ID
    $teacherId: ID
    $private: String
  ) {
    createSession(
      data: {
        startTime: $startTime
        endTime: $endTime
        maxSizeOfClass: $maxSizeOfClass
        status: PUBLISHED
        teacher: { connect: { id: $teacherId } }
        course: { connect: { id: $courseId } }
        privateTutoring: { connect: { name: $private } }
      }
    ) {
      id
    }
  }
`;
class PrivateTutoring extends React.Component {
  constructor(...args) {
    super(...args);
    const { courses, teachers, privateTutorings } = this.props;
    this.state = {
      layer: false,
      typeSelect: "",
      sessionTypeError: false,
      selectedCourse: "",
      courseError: false,
      courseOptions: courses.map(i => i.name),
      courseNamesCopy: courses.map(i => i.name),
      courseIDs: courses.map(i => i.id),
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
      typeList: privateTutorings.map(i => i.name),
    };
  }

  layerToggle = changeAction => {
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        layer: false,
        typeSelect: "",
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
      });
    }
  };

  setSessionType = event => {
    const { privateTutorings } = this.props;
    const { typeList } = this.state;
    const privateIndex = typeList.indexOf(event.value);

    this.setState({
      typeSelect: event.value,
      sessionTypeError: false,
      privateIndex,
      maxSizeOfClass: privateTutorings[privateIndex].maxSizeOfClass,
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
      typeSelect: "",
      privateIndex: null,
      maxSizeOfClass: 0,
    });
  };

  convertEndTimeToString = (date, time, index, arr) => {
    const endDateTime = convertDateTime(date, time, index, arr);
    return endDateTime.toLocaleTimeString();
  };

  render() {
    const {
      typeSelect,
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
      typeList,
      privateIndex,
    } = this.state;
    const { privateTutorings } = this.props;
    return (
      <Box>
        {console.log(this.state)}
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
                      typeSelect.length === 0 ||
                      selectedCourse.length === 0 ||
                      selectedTeacher.length === 0 ||
                      startTime.length === 0
                    ) {
                      this.errorCheck(selectedCourse, "courseError");
                      this.errorCheck(selectedTeacher, "teacherError");
                      this.errorCheck(typeSelect, "sessionTypeError");
                      this.errorCheck(startTime, "startTimeError");
                    } else {
                      // date, time, (index = 0), (add = null);
                      const finalStart = convertDateTime(startDate, startTime);
                      const finalEnd = convertDateTime(
                        startDate,
                        startTime,
                        privateIndex,
                        privateTutorings,
                      );
                      console.log(finalStart);
                      console.log(finalEnd);
                    }
                  }}
                >
                  <Box fill overflow="scroll" justify="between">
                    <Box>
                      <TypeOfClass
                        typeSelect={typeSelect}
                        privateTutorings={privateTutorings}
                        setSessionType={this.setSessionType}
                        sessionTypeError={sessionTypeError}
                        typeList={typeList}
                      />
                      <SelectCourse
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
                        {startTime && typeSelect && (
                          <Text size="large">
                            {`
                            Session end time: ${this.convertEndTimeToString(
                              startDate,
                              startTime,
                              privateIndex,
                              privateTutorings,
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
