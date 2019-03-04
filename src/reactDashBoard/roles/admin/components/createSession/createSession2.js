import React from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Box, Button, Layer, Heading, RangeInput, FormField } from "grommet";
import { Add, FormClose, FormSubtract } from "grommet-icons";
import EndTime from "./endTime";
import SelectCourse from "./selectCourse";
import SelectTeacher from "./selectTeacher";
import StartDate from "./startDate";
import StartTimePicker from "./startTimePicker";
import { TitleWrapper } from "../../sharedStyles/slideLayer";
import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
import SelectNonAP from "./selectNonAP";
import MaxStudents from "./maxStudents";

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
// const HoverBorder = styled(Box)`
//   transition: all 250ms ease-in-out;
//   div {
//     :nth-of-type(2) {
//       :hover {
//         border-bottom: 1px solid #6aac5c !important;
//       }
//     }
//   }
// `;

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
  constructor(props) {
    super(props);
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
      endTime: "",
      endTimeError: false,
      moneySelectIndex: null,
      moneySelect: "",
      moneyOptions: [],
      moneyError: false,
      money: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const teachersNames = [];
    const courseNames = [];
    const teacherIDs = [];
    const courseIDs = [];
    const moneyOptions = [];
    const money = [];
    data.timeAndPrices.map(t => {
      moneyOptions.push(t.name);
      money.push(t);
    });
    const date = new Date();
    data.teachers.map(teacher => {
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    data.courses.map(course => {
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

  startOnOpen = () => this.setState({ startDateOpen: true });

  startOnClose = () => this.setState({ startDateOpen: false });

  onChangeStartTime = event =>
    this.setState({ startTime: event.target.value, startTimeError: false });

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  onOpen = () => this.setState({ layerOpen: true });

  onClose = () =>
    this.setState({
      layerOpen: false,
      startTime: "",
      endTime: "",
      selectedCourse: "",
      selectedTeacher: "",
      maxSizeOfClass: 0,
      moneySelect: "",
      moneyError: false,
      courseError: false,
      teacherError: false,
      moneySelectIndex: null,
    });

  onMoneyChange = event => {
    const { money, moneyOptions } = this.state;
    const moneySelectIndex = moneyOptions.indexOf(event.value);
    console.log("event", event.value);
    console.log("moneyIndex", moneySelectIndex);

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

  convertDateTime = (date, time, add = null) => {
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
    console.log(minutes, "min");
    console.log(hour, "hour");
    if (add === null) {
      finalStart.setHours(hour);
      finalStart.setMinutes(minutes);
      finalStart.setSeconds(0);
    }
    if (this.state.money[this.state.moneySelectIndex].time === 60) {
      finalStart.setHours(hour + 1);
      finalStart.setMinutes(minutes);
      finalStart.setSeconds(0);
    }
    if (
      this.state.money[this.state.moneySelectIndex].time === 90 ||
      this.state.money[this.state.moneySelectIndex].time === 120
    ) {
      const newMin =
        minutes + this.state.money[this.state.moneySelectIndex].time;
      const newHours = Math.floor(newMin / 60);
      const remander = newMin % 60;
      finalStart.setHours(hour + newHours);
      finalStart.setMinutes(remander);
      finalStart.setSeconds(0);
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
    } = this.state;
    return (
      <Box fill align="end" justify="end">
        {console.log(this.state)}
        <Button
          icon={<Add />}
          label="Add Session"
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
            <TitleWrapper
              background="#61a785"
              flex={false}
              direction="row"
              justify="between"
              elevation="xlarge"
              pad={{
                left: "medium",
                right: "medium",
                top: "xsmall",
                bottom: "xsmall",
              }}
            >
              <Heading level={2} margin="none" color="floralwhite">
                Add Session
              </Heading>
              <Button
                icon={<FormClose color="floralwhite" size="large" />}
                onClick={this.onClose}
              />
            </TitleWrapper>
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
                      selectedTeacher.length === 0
                    ) {
                      this.errorCheck(selectedCourse, "courseError");
                      this.errorCheck(selectedTeacher, "teacherError");
                      this.errorCheck(moneySelect, "moneyError");
                    }
                    console.log(
                      this.convertDateTime(
                        startDate,
                        startTime,
                        money[moneySelectIndex].time,
                      ),
                    );
                  }}
                >
                  <Box
                    fill
                    overflow="scroll"
                    pad={{ vertical: "small" }}
                    gap="small"
                    justify="between"
                  >
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
                      />
                      {/* <HoverBorder> */}
                      <StartDate
                        startDateOpen={startDateOpen}
                        startOnOpen={this.startOnOpen}
                        startOnClose={this.startOnClose}
                        startDate={startDate}
                        startDateSelect={this.startDateSelect}
                      />
                      {/* </HoverBorder> */}
                      {/* <HoverBorder> */}

                      {/* </HoverBorder> */}
                      {/* {moneySelectIndex && (
                        <MaxStudents
                          onMaxChange={this.onMaxChange}
                          maxSizeOfClass={maxSizeOfClass}
                        />
                      )} */}
                      {moneySelect && (
                        <> {`Max number of students ${maxSizeOfClass}`}</>
                      )}
                      {moneySelect && (
                        <> {`Session length ${money[moneySelectIndex].time}`}</>
                      )}
                      {startTime && <>poop</>}
                    </Box>
                    <Button type="submit" label="Add" primary icon={<Add />} />
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
