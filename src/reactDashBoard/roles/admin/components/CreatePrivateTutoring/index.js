import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box } from "grommet";
import { Add, FormSubtract } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "./typeOfClass";
import SelectCourse from "../createSession/selectCourse";
import SelectTeacher from "../createSession/selectTeacher";
import StartDate from "../createSession/startDate";
import StartTimePicker from "../createSession/startTimePicker";

class PrivateTutoring extends React.Component {
  constructor(...args) {
    super(...args);
    const { courses, teachers } = this.props;
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
      });
    }
  };

  setSessionType = event => {
    this.setState({ typeSelect: event.value, sessionTypeError: false });
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
    } = this.state;
    const { privateTutorings } = this.props;
    return (
      <Box>
        {console.log(this.props)}
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
            <Box
              gap="small"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              as="form"
            >
              <Box fill overflow="scroll" justify="between">
                <Box>
                  <TypeOfClass
                    typeSelect={typeSelect}
                    privateTutorings={privateTutorings}
                    setSessionType={this.setSessionType}
                    sessionTypeError={sessionTypeError}
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
                </Box>
                <Box
                  direction="row"
                  justify="between"
                  pad={{ horizontal: "xsmall", vertical: "xsmall" }}
                >
                  <Button type="submit" label="ADD" primary icon={<Add />} />
                  <Button
                    icon={<FormSubtract />}
                    label="CLEAR"
                    onClick={() =>
                      this.setState({
                        selectedCourse: "",
                        selectedTeacher: "",
                        startDate: new Date().toISOString(),
                        startTime: "",
                        startTimeError: false,
                        courseError: false,
                        teacherError: false,
                      })
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

export default PrivateTutoring;
