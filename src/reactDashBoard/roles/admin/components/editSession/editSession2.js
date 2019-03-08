import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { Add, FormSubtract } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "../CreatePrivateTutoring/typeOfClass";
import SelectNonAP from "../createSession/selectNonAP";
import SelectCourse from "../sharedComponents/selectCourse";
import SelectTeacher from "../sharedComponents/selectTeacher";
import StartDate from "../sharedComponents/startDate";
import StartTimePicker from "../sharedComponents/startTimePicker";
import convertDateTime from "../../sharedFunctions/convertDateTime";
import { ALL_FOR_ADMIN } from "../../../../queryComponents/QueryAdminViewAll";

class EditSession extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      layer: false,
      startDate: "",
      selectedTeacher: "",
      teacherOptions: [],
      teacherOptionsCopy: [],
      // privateSelect: "",
      selectedGroup: "",
      groupOptions: [],
      groupOptionsObj: [],
      selectedCourse: "",
      courseOptions: [],
      courseOptionsCopy: [],
      courseIDs: [],
    };
  }

  componentDidMount() {
    const {
      teachers,
      selectedTeacher,
      selectedGroup,
      startDate,
      groupVSPrivate,
      timeAndPrices,
      courses,
      selectedCourse,
    } = this.props;

    const teacherOptions = [];
    const teacherIDs = [];
    teachers.map(teacher => {
      teacherOptions.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });

    const courseOptions = [];
    const courseIDs = [];
    const groupOptions = [];
    const groupOptionsObj = [];
    if (groupVSPrivate === "Group") {
      timeAndPrices.map(t => {
        if (t.groupVsPrivate === "Group") {
          groupOptions.push(t.name);
          groupOptionsObj.push(t);
        }
        return null;
      });
      courses.map(course => {
        if (course.apNonAp === "Reg") {
          courseOptions.push(course.name);
          courseIDs.push(course.id);
        }
        return null;
      });
    } else {
      timeAndPrices.map(t => {
        if (t.groupVsPrivate === "Private") {
          groupOptions.push(t.name);
          groupOptionsObj.push(t);
        }
        return null;
      });
      courses.map(course => {
        if (selectedGroup === "Private Tutoring") {
          if (course.apNonAp === "Reg") {
            courseIDs.push(course.id);
            courseOptions.push(course.name);
          }
        }
        if (selectedGroup === "Private Collage Prep") {
          if (course.apNonAp === "Prep") {
            courseIDs.push(course.id);
            courseOptions.push(course.name);
          }
        }
        return null;
      });
    }

    this.setState({
      startDate,
      teacherIDs,
      teacherOptions,
      teacherOptionsCopy: teacherOptions,
      selectedTeacher,
      selectedGroup,
      groupOptions,
      groupOptionsObj,
      selectedCourse,
      courseOptions,
      courseOptionsCopy: courseOptions,
    });
  }

  layerToggle = changeAction => {
    const { selectedTeacher, selectedGroup, startDate } = this.props;
    // const startDate = new Date(session.startTime);
    // eslint-disable-next-line prettier/prettier
    // const currentTeacher = `${session.teacher.firstName} ${
    //   session.teacher.lastName
    // }`;
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        layer: false,
        // typeSelect: "",
        sessionTypeError: false,
        // selectedCourse: "",
        // courseError: false,
        // teacherError: false,
        selectedTeacher,
        // startDateOpen: false,
        startDate,
        // startTimeError: false,
        // startTime: "",
        // privateIndex: null,
        // maxSizeOfClass: 0,
        // courseBool: true,
        // extraTime: false,

        selectedGroup,
      });
    }
  };

  teacherSelectChange = event => {
    const { teacherOptionsCopy } = this.state;
    this.setState({
      selectedTeacher: event.value,
      teacherOptions: teacherOptionsCopy,
      teacherError: false,
    });
  };

  onSearchTeachers = searchText => {
    const { teacherOptionsCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      teacherOptions: teacherOptionsCopy.filter(o => o.match(regexp)),
    });
  };

  startDateToggle = bool => this.setState({ startDateOpen: bool });

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  render() {
    const {
      layer,
      privateSelect,
      sessionTypeError,
      privateList,
      selectedGroup,
      groupOptions,
      groupError,
      selectedTeacher,
      teacherOptions,
      teacherError,
      startDate,
      startDateOpen,
      startTimeError,
      startTime,
      startTimeMessage,
      courseBool,
      selectedCourse,
      courseError,
      courseOptions,
    } = this.state;
    const { groupVSPrivate, session } = this.props;
    return (
      <Box>
        {console.log(this.props)}
        <Button
          icon={<Add />}
          label="Edit Session"
          onClick={() => this.layerToggle(true)}
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
              headingText={`Edit ${groupVSPrivate} Session`}
              modelFunc={this.layerToggle}
            />
            <Box
              gap="small"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              as="form"
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              <Box fill overflow="scroll" justify="between">
                {console.log("STATE!!!", this.state)}
                <Box>
                  {groupVSPrivate === "Private" && (
                    <>
                      <TypeOfClass
                        typeSelect={selectedGroup}
                        setSessionType={this.setSessionType}
                        sessionTypeError={sessionTypeError}
                        typeList={groupOptions}
                      />
                      <SelectCourse
                        courseBool={courseBool}
                        selectedCourse={selectedCourse}
                        courseError={courseError}
                        courseOptions={courseOptions}
                        courseSelectChange={this.courseSelectChange}
                        onSearchCourses={this.onSearchCourses}
                      />
                    </>
                  )}
                  {groupVSPrivate === "Group" && (
                    <>
                      <SelectNonAP
                        moneySelect={selectedGroup}
                        moneyOptions={groupOptions}
                        moneyError={groupError}
                        onMoneyChange={this.onGroupChange}
                      />
                      <SelectCourse
                        selectedCourse={selectedCourse}
                        courseSelectChange={this.courseSelectChange}
                        onSearchCourses={this.onSearchCourses}
                        courseOptions={courseOptions}
                        courseError={courseError}
                      />
                    </>
                  )}
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
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    );
  }
}

export default EditSession;
