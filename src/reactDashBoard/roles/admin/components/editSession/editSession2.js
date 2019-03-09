import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { Add, FormSubtract } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "../sharedComponents/typeOfClass";
// import SelectNonAP from "../createSession/selectNonAP";
import SelectCourse from "../sharedComponents/selectCourse";
import SelectTeacher from "../sharedComponents/selectTeacher";
import StartDate from "../sharedComponents/startDate";
import StartTimePicker from "../sharedComponents/startTimePicker";
import convertDateTime from "../../sharedFunctions/convertDateTime";
import { ALL_FOR_ADMIN } from "../../../../queryComponents/QueryAdminViewAll";

class EditSession extends React.Component {
  static propTypes = {
    selectedCourse: PropTypes.string,
    selectedTeacher: PropTypes.string,
    selectedType: PropTypes.string,
    // setMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedCourse: "Didn't pass selectedCourse props",
    selectedTeacher: "Didn't pass selectedTeacher prop",
    selectedType: "Didn't pass selectedType prop",
  };

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
      typeOptions: [],
      typeOptionsObj: [],
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
      selectedType,
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
    const typeOptions = [];
    const typeOptionsObj = [];
    if (groupVSPrivate === "Group") {
      timeAndPrices.map(t => {
        if (t.groupVsPrivate === "Group") {
          typeOptions.push(t.name);
          typeOptionsObj.push(t);
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
          typeOptions.push(t.name);
          typeOptionsObj.push(t);
        }
        return null;
      });
      courses.map(course => {
        if (selectedType === "Private Tutoring") {
          if (course.apNonAp === "Reg") {
            courseIDs.push(course.id);
            courseOptions.push(course.name);
          }
        }
        if (selectedType === "Private Collage Prep") {
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
      selectedType,
      typeOptions,
      typeOptionsObj,
      selectedCourse,
      courseOptions,
      courseOptionsCopy: courseOptions,
    });
  }

  layerToggle = changeAction => {
    const { selectedTeacher, selectedType, startDate } = this.props;
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

        selectedType,
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

  courseSelectChange = event => {
    const { courseOptionsCopy } = this.state;
    this.setState({
      selectedCourse: event.value,
      courseOptions: courseOptionsCopy,
      courseError: false,
    });
  };

  onSearchCourses = searchText => {
    const { courseOptionsCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      courseOptions: courseOptionsCopy.filter(o => o.match(regexp)),
    });
  };

  startDateToggle = bool => this.setState({ startDateOpen: bool });

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  render() {
    const {
      layer,
      selectedType,
      typeOptions,
      typeError,
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
    const { groupVSPrivate } = this.props;
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
                        selectedType={selectedType}
                        typeSelectChange={this.typeSelectChange}
                        typeError={typeError}
                        typeOptions={typeOptions}
                        typeLabel="Type of class"
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
                      <TypeOfClass
                        selectedType={selectedType}
                        typeOptions={typeOptions}
                        typeError={typeError}
                        onTypeChange={this.onTypeChange}
                        typeLabel="Non AP Time"
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
