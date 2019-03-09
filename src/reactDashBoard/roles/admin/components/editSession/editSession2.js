import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { Edit, ClearOption } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "../sharedComponents/typeOfClass";
import SelectCourse from "../sharedComponents/selectCourse";
import SelectTeacher from "../sharedComponents/selectTeacher";
import StartDate from "../sharedComponents/startDate";
import StartTimePicker from "../sharedComponents/startTimePicker";
import convertDateTime from "../../sharedFunctions/convertDateTime";
import { ALL_FOR_ADMIN } from "../../../../queryComponents/QueryAdminViewAll";

const UPDATE_SESSION = gql`
  mutation(
    $startTime: DateTime
    $endTime: DateTime
    $maxSizeOfClass: Int
    $courseId: ID
    $teacherId: ID
    $timeAndPrice: String
    $sessionId: ID
  ) {
    updateSession(
      where: { id: $sessionId }
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
      maxSizeOfClass: 0,
      selectedGroup: "",
      typeIndex: null,
      typeOptions: [],
      typeOptionsObj: [],
      selectedCourse: "",
      courseOptions: [],
      courseOptionsCopy: [],
      courseIDs: [],
      startTime: "",
      startDateOpen: false,
    };
  }

  componentDidMount() {
    const {
      teachers,
      groupVSPrivate,
      timeAndPrices,
      courses,
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
      maxSizeOfClass,
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
    const typeIndex = typeOptions.indexOf(selectedType);
    this.setState({
      startDate,
      startTime,
      teacherIDs,
      teacherOptions,
      teacherOptionsCopy: teacherOptions,
      selectedTeacher,
      typeIndex,
      selectedType,
      typeOptions,
      typeOptionsObj,
      selectedCourse,
      courseOptions,
      courseOptionsCopy: courseOptions,
      maxSizeOfClass,
    });
  }

  layerToggle = changeAction => {
    const { selectedTeacher, selectedType, startDate } = this.props;
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
        startDateOpen: false,
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

  onChangeStartTime = event => {
    this.setState({
      startTime: event.target.value,
      startTimeError: false,
      startTimeMessage: "Please enter start time",
    });
  };

  typeSelectChange = event => {
    const { groupVSPrivate, courses } = this.props;
    const { typeOptionsObj, typeOptions } = this.state;
    const typeIndex = typeOptions.indexOf(event.value);
    if (groupVSPrivate === "Group") {
      this.setState({
        selectedType: event.value,
        typeError: false,
        typeIndex,
        maxSizeOfClass: typeOptionsObj[typeIndex].maxStudents,
      });
    } else {
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
        typeError: false,
        typeIndex,
        courseBool: false,
        maxSizeOfClass: typeOptionsObj[typeIndex].maxStudents,
      });
    }
  };

  resetButton = () => {
    const {
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
    } = this.props;
    this.setState({
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
    });
  };

  convertEndTimeToString = (date, time, index, arr, extra) => {
    const endDateTime = convertDateTime(date, time, index, arr, extra);
    return endDateTime.toLocaleTimeString();
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
      typeOptionsObj,
      typeIndex,
      maxSizeOfClass,
      extraTime,
    } = this.state;
    const {
      selectedTeacher: selectedTeachProps,
      selectedType: selectedTypeProps,
      startDate: startDateProps,
      selectedCourse: selectedCourseProps,
      startTime: startTimeProps,
    } = this.props;
    const { groupVSPrivate } = this.props;
    return (
      <Box>
        <Button
          icon={<Edit />}
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
            <Mutation
              mutation={UPDATE_SESSION}
              refetchQueries={() => {
                return [
                  {
                    query: ALL_FOR_ADMIN,
                  },
                ];
              }}
            >
              {updateSession => (
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
                      selectedTypeProps === selectedType &&
                      selectedCourseProps === selectedCourse &&
                      selectedTeachProps === selectedTeacher &&
                      startDateProps === startDate &&
                      startTimeProps === startTime
                    ) {
                      console.log("POOP");
                    }
                  }}
                >
                  <Box fill overflow="scroll" justify="between">
                    {console.log("STATE!!!", this.state)}
                    <Box>
                      {groupVSPrivate === "Private" && (
                        <TypeOfClass
                          selectedType={selectedType}
                          typeSelectChange={this.typeSelectChange}
                          typeError={typeError}
                          typeOptions={typeOptions}
                          typeLabel="Type of class"
                        />
                      )}
                      {groupVSPrivate === "Group" && (
                        <TypeOfClass
                          selectedType={selectedType}
                          typeOptions={typeOptions}
                          typeError={typeError}
                          typeSelectChange={this.typeSelectChange}
                          typeLabel="Non AP Time"
                        />
                      )}
                      <SelectCourse
                        selectedCourse={selectedCourse}
                        courseSelectChange={this.courseSelectChange}
                        onSearchCourses={this.onSearchCourses}
                        courseOptions={courseOptions}
                        courseError={courseError}
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
                      {console.log(
                        "start!",
                        startDate,
                        "startTime!",
                        startTime,
                        "index",
                        typeIndex,
                        "typeOptionsObj",
                        typeOptionsObj,
                        typeOptionsObj[typeIndex].time,
                      )}
                      {groupVSPrivate === "Group" && (
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
                          {/* (date, time, index, arr, extra) */}
                          {startTime && selectedType && (
                            <Text size="large">
                              {`
                            Session end time: ${this.convertEndTimeToString(
                              startDate,
                              startTime,
                              typeIndex,
                              typeOptionsObj,
                              typeOptionsObj[typeIndex].time,
                            )}`}
                            </Text>
                          )}
                        </Box>
                      )}
                      {groupVSPrivate === "Private" && (
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
                              typeIndex,
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
                              typeIndex,
                              typeOptionsObj,
                              30,
                            )}`}
                                  </Text>
                                </>
                              )}
                            </>
                          )}
                        </Box>
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
                      label="UPDATE"
                      primary
                      icon={<Edit />}
                    />
                    <Button
                      icon={<ClearOption />}
                      label="RESET"
                      onClick={this.resetButton}
                    />
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

export default EditSession;
