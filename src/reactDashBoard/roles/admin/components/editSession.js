import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { Edit, ClearOption } from "grommet-icons";
import LayerHeader from "./sharedComponents/layerHeader";
import TypeOfClass from "./sharedComponents/typeOfClass";
import SelectCourse from "./sharedComponents/selectCourse";
import SelectTeacher from "./sharedComponents/selectTeacher";
import StartDate from "./sharedComponents/startDate";
import StartTimePicker from "./sharedComponents/startTimePicker";
import convertDateTime from "../sharedFunctions/convertDateTime";
import { ALL_FOR_ADMIN } from "../../../queryComponents/QueryAdminViewAll";
import InputStatusMessage from "./sharedComponents/inputStatusMessage";

const UPDATE_SESSION = gql`
  mutation(
    $startTime: DateTime
    $endTime: DateTime
    $maxSizeOfClass: Int
    $courseId: ID
    $teacherId: ID
    $timeAndPrice: String
    $sessionId: ID
    $extraTime: Int
  ) {
    updateSession(
      where: { id: $sessionId }
      data: {
        startTime: $startTime
        endTime: $endTime
        maxSizeOfClass: $maxSizeOfClass
        extraTime: $extraTime
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
    startTime: PropTypes.string.isRequired,
    teachers: PropTypes.instanceOf(Object).isRequired,
    timeAndPrices: PropTypes.instanceOf(Object).isRequired,
    courses: PropTypes.instanceOf(Object).isRequired,
    maxSizeOfClass: PropTypes.number.isRequired,
    groupVSPrivate: PropTypes.string.isRequired,
    session: PropTypes.instanceOf(Object).isRequired,
    startDate: PropTypes.string.isRequired,
    eventTimer: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
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
      teacherIDs: [],
      maxSizeOfClass: 0,
      selectedType: "",
      typeIndex: null,
      typeOptions: [],
      typeOptionsObj: [],
      typeMessageBool: false,
      selectedCourse: "",
      courseOptions: [],
      courseOptionsCopy: [],
      courseIDs: [],
      startTime: "",
      startDateOpen: false,
      extraTime: 0,
      extraTimeBool: false,
      courseMessageBool: false,
      nothingChanged: false,
      startTimeMessageBool: false,
      startDateMessageBool: false,
    };
  }

  componentDidMount() {
    const {
      teachers,
      timeAndPrices,
      courses,
      groupVSPrivate,
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
      maxSizeOfClass,
      session,
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
      courseIDs,
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
      groupVSPrivate,
      extraTime: session.extraTime,
      extraTimeBool: session.extraTime > 0 && true,
      success: true,
    });
  }

  componentWillReceiveProps(nextProps) {
    const courseOptions = [];
    const courseIDs = [];
    const typeOptions = [];
    const typeOptionsObj = [];
    const {
      maxSizeOfClass,
      groupVSPrivate,
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
      timeAndPrices,
      courses,
    } = this.props;
    if (
      nextProps.maxSizeOfClass !== maxSizeOfClass ||
      nextProps.groupVSPrivate !== groupVSPrivate ||
      nextProps.selectedTeacher !== selectedTeacher ||
      nextProps.selectedType !== selectedType ||
      nextProps.startDate !== startDate ||
      nextProps.selectedCourse !== selectedCourse ||
      nextProps.startTime !== startTime
    ) {
      if (nextProps.groupVSPrivate === "Group") {
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
          if (nextProps.selectedType === "Private Tutoring") {
            if (course.apNonAp === "Reg") {
              courseIDs.push(course.id);
              courseOptions.push(course.name);
            }
          }
          if (nextProps.selectedType === "Private Collage Prep") {
            if (course.apNonAp === "Prep") {
              courseIDs.push(course.id);
              courseOptions.push(course.name);
            }
          }
          return null;
        });
      }
      this.setState({
        maxSizeOfClass: nextProps.maxSizeOfClass,
        groupVSPrivate: nextProps.groupVSPrivate,
        selectedTeacher: nextProps.selectedTeacher,
        selectedType: nextProps.selectedType,
        startDate: nextProps.startDate,
        selectedCourse: nextProps.selectedCourse,
        startTime: nextProps.startTime,
        extraTime:
          nextProps.session.extraTime > 0 && nextProps.session.extraTime,
        extraTimeBool: nextProps.session.extraTime > 0 && true,
        courseOptions,
        courseOptionsCopy: courseOptions,
        courseIDs,
        typeOptions,
        typeOptionsObj,
        success: true,
      });
    }
  }

  layerToggle = changeAction => {
    const {
      selectedTeacher,
      selectedType,
      startDate,
      maxSizeOfClass,
      startTime,
      selectedCourse,
    } = this.props;
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        success: true,
        startTimeMessageBool: false,
        layer: false,
        typeMessageBool: false,
        selectedCourse,
        courseMessageBool: false,
        teacherMessageBool: false,
        selectedTeacher,
        startDateOpen: false,
        startDate,
        maxSizeOfClass,
        extraTime: false,
        startTime,
        selectedType,
        nothingChanged: false,
        startDateMessageBool: false,
        courseMessage: "Course updated",
      });
    }
  };

  teacherSelectChange = event => {
    const { teacherOptionsCopy } = this.state;
    this.setState({
      selectedTeacher: event.value,
      teacherOptions: teacherOptionsCopy,
      teacherMessageBool: true,
      nothingChanged: false,
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
      courseMessageBool: true,
      nothingChanged: false,
      success: true,
      courseMessage: "Course updated",
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
    this.setState({
      startDate: date,
      startDateOpen: false,
      startDateMessageBool: true,
      nothingChanged: false,
    });
  };

  onChangeStartTime = event => {
    this.setState({
      startTime: event.target.value,
      startTimeMessageBool: true,
      startTimeMessage: "Start Time Updated.",
      nothingChanged: false,
    });
  };

  typeSelectChange = event => {
    const { groupVSPrivate, courses } = this.props;
    const { typeOptionsObj, typeOptions } = this.state;
    const typeIndex = typeOptions.indexOf(event.value);
    if (groupVSPrivate === "Group") {
      this.setState({
        selectedType: event.value,
        typeMessageBool: true,
        typeIndex,
        maxSizeOfClass: typeOptionsObj[typeIndex].maxStudents,
        nothingChanged: false,
      });
    } else {
      const courseOptions = [];
      const courseOptionsCopy = [];
      const courseIDs = [];

      courses.map(course => {
        if (event.value === "Private Tutoring") {
          if (course.apNonAp === "Reg") {
            courseIDs.push(course.id);
            courseOptions.push(course.name);
            courseOptionsCopy.push(course.name);
          }
        }
        if (event.value === "Private Collage Prep") {
          if (course.apNonAp === "Prep") {
            courseIDs.push(course.id);
            courseOptions.push(course.name);
            courseOptionsCopy.push(course.name);
          }
        }
        return null;
      });
      this.setState({
        courseOptions,
        courseOptionsCopy,
        courseIDs,
        selectedCourse: "",
        selectedType: event.value,
        typeIndex,
        maxSizeOfClass: typeOptionsObj[typeIndex].maxStudents,
        typeMessageBool: true,
        nothingChanged: false,
      });
    }
  };

  resetButton = () => {
    const {
      maxSizeOfClass,
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
    } = this.props;
    this.setState({
      maxSizeOfClass,
      selectedTeacher,
      selectedType,
      startDate,
      selectedCourse,
      startTime,
      courseMessageBool: false,
      typeMessageBool: false,
      teacherMessageBool: false,
      startTimeMessageBool: false,
      nothingChanged: false,
      startDateMessageBool: false,
      success: true,
      courseMessage: "Course Updated.",
    });
  };

  render() {
    const {
      layer,
      selectedType,
      typeOptions,
      selectedTeacher,
      teacherOptions,
      teacherMessageBool,
      startDate,
      startDateOpen,
      startTimeMessageBool,
      startTime,
      startTimeMessage,
      extraTimeBool,
      selectedCourse,
      courseMessageBool,
      courseOptions,
      typeOptionsObj,
      typeIndex,
      maxSizeOfClass,
      extraTime,
      groupVSPrivate,
      typeMessageBool,
      nothingChanged,
      startDateMessageBool,
      courseIDs,
      teacherIDs,
      teacherOptionsCopy,
      courseOptionsCopy,
      success,
      courseMessage,
    } = this.state;
    const {
      maxSizeOfClass: propsMaxSizeOfClass,
      selectedTeacher: propsSelectedTeacher,
      selectedType: propsSelectedType,
      startDate: propsStartDate,
      selectedCourse: propsSelectedCourse,
      startTime: propsStartTime,
      session,
      eventTimer,
      setMessage,
    } = this.props;
    return (
      <Box>
        {/* {console.log(session)} */}
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
                    // const finalStart = convertDateTime(startDate, startTime);
                    const finalEnd = convertDateTime(
                      startDate,
                      startTime,
                      typeOptionsObj[typeIndex].time,
                      extraTime,
                    );
                    if (
                      propsMaxSizeOfClass === maxSizeOfClass &&
                      propsSelectedType === selectedType &&
                      propsSelectedCourse === selectedCourse &&
                      propsSelectedTeacher === selectedTeacher &&
                      propsStartDate === startDate &&
                      propsStartTime === startTime
                      // session.endTime === finalEnd
                    ) {
                      this.setState({ nothingChanged: true });
                    } else {
                      if (selectedCourse.length === 0) {
                        this.setState({
                          courseMessage: "Please select a course.",
                          courseMessageBool: true,
                          success: false,
                        });
                      }
                      const teacherId =
                        teacherIDs[teacherOptionsCopy.indexOf(selectedTeacher)];
                      const courseId =
                        courseIDs[courseOptionsCopy.indexOf(selectedCourse)];
                      const finalStart = convertDateTime(startDate, startTime);

                      // The Idea behind newData was to create a object with just the changed
                      // data and in the future use it for a messaging service between the teachers
                      // and the Admin but, the mutation requires "teacherId", "courseId",
                      // and "timeAndPrice" to be passed in to be successful. Not sure where
                      // my knowledge gap is. Either I'm not writting the mutation correctly
                      // or I don't fundamentally understanding GraphQL. I'm keeping newData
                      // in place to pickup the rest of the changed vars in hopes that I'll come
                      // back to this with fresh eyes and figure it out.
                      const newData = {
                        startTime:
                          propsStartDate !== startDate ? finalStart : false,
                        extraTime:
                          session.extraTime !== extraTime ? extraTime : false,
                        endTime:
                          new Date(session.endTime).toLocaleString() !==
                          finalEnd.toLocaleString()
                            ? finalEnd
                            : false,
                        maxSizeOfClass:
                          propsMaxSizeOfClass !== maxSizeOfClass
                            ? maxSizeOfClass
                            : false,
                        // I WANT TO KEEP THESE TO.
                        // timeAndPrice:
                        //   propsSelectedType !== selectedType
                        //     ? selectedType
                        //     : false,
                        // course:
                        //   propsSelectedCourse !== selectedCourse
                        //     ? courseId
                        //     : false,
                        // teacherId:
                        //   propsSelectedTeacher !== selectedTeacher
                        //     ? teacherId
                        //     : false,
                      };

                      Object.keys(newData).forEach(key => {
                        if (!newData[key]) {
                          delete newData[key];
                        }
                      });
                      updateSession({
                        variables: {
                          courseId,
                          teacherId,
                          timeAndPrice: selectedType,
                          sessionId: session.id,
                          ...newData,
                        },
                      });
                      this.layerToggle(false);
                      eventTimer(true);
                      setMessage("Session Updated");
                    }
                  }}
                >
                  <Box fill overflow="scroll" justify="between">
                    <Box>
                      {groupVSPrivate === "Private" && (
                        <TypeOfClass
                          selectedType={selectedType}
                          typeSelectChange={this.typeSelectChange}
                          typeError={typeMessageBool}
                          typeOptions={typeOptions}
                          typeLabel="Type of class"
                          typeMessage="Updated class type."
                          success
                        />
                      )}
                      {groupVSPrivate === "Group" && (
                        <TypeOfClass
                          selectedType={selectedType}
                          typeOptions={typeOptions}
                          typeError={typeMessageBool}
                          typeSelectChange={this.typeSelectChange}
                          typeLabel="Non AP Time"
                          typeMessage="Updated class type."
                          success
                        />
                      )}
                      <SelectCourse
                        courseSelectChange={this.courseSelectChange}
                        onSearchCourses={this.onSearchCourses}
                        selectedCourse={selectedCourse}
                        courseOptions={courseOptions}
                        courseError={courseMessageBool}
                        courseMessage={courseMessage}
                        success={success}
                      />
                      <SelectTeacher
                        teacherSelectChange={this.teacherSelectChange}
                        onSearchTeachers={this.onSearchTeachers}
                        selectedTeacher={selectedTeacher}
                        teacherOptions={teacherOptions}
                        teacherError={teacherMessageBool}
                        teacherMessage="Updated teacher."
                        success
                      />
                      <StartDate
                        startDateToggle={this.startDateToggle}
                        startDateSelect={this.startDateSelect}
                        startDate={startDate}
                        startDateOpen={startDateOpen}
                        startDateMessage="Date Updated"
                        startDateMessageBool={startDateMessageBool}
                        success
                      />
                      <StartTimePicker
                        onChangeStartTime={this.onChangeStartTime}
                        startTimeError={startTimeMessageBool}
                        startTime={startTime}
                        startTimeMessage={startTimeMessage}
                        success
                      />
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
                            Session end time: ${convertDateTime(
                              startDate,
                              startTime,
                              typeOptionsObj[typeIndex].time,
                            ).toLocaleTimeString()}`}
                            </Text>
                          )}
                        </Box>
                      )}
                      {groupVSPrivate === "Private" && (
                        <Box direction="column" gap="small">
                          <CheckBox
                            checked={extraTimeBool}
                            label="Add extra 30 minutes?"
                            onChange={event => this.extra30Mintutes(event)}
                          />
                          {extraTime !== true ? (
                            <>
                              {startTime && selectedType && (
                                <>
                                  <Text size="large">
                                    {`
                            Session end time: ${convertDateTime(
                              startDate,
                              startTime,
                              typeOptionsObj[typeIndex].time,
                              extraTime,
                            ).toLocaleTimeString()}`}
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
                            Session end time: ${convertDateTime(
                              startDate,
                              startTime,
                              typeOptionsObj[typeIndex].time,
                              extraTime,
                            ).toLocaleTimeString()}`}
                                  </Text>
                                </>
                              )}
                            </>
                          )}
                        </Box>
                      )}
                    </Box>
                    {nothingChanged && (
                      <InputStatusMessage
                        toggle={nothingChanged}
                        message="No fields have been modified."
                        size="large"
                        bottomMessage
                      />
                    )}
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
