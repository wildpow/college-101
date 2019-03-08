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
    };
  }

  componentDidMount() {
    const { session, teachers } = this.props;
    const teacherOptions = [];
    // const courseNames = [];
    const teacherIDs = [];
    // const courseIDs = [];
    // const moneyOptions = [];
    // const money = [];
    teachers.map(teacher => {
      teacherOptions.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });

    const startDate = new Date(session.startTime);
    const currentTeacher = `${session.teacher.firstName} ${
      session.teacher.lastName
    }`;
    this.setState({
      startDate: startDate.toISOString(),
      teacherIDs,
      teacherOptions,
      teacherOptionsCopy: teacherOptions,
      selectedTeacher: currentTeacher,
    });
  }

  layerToggle = changeAction => {
    const { session } = this.props;
    const startDate = new Date(session.startTime);
    // eslint-disable-next-line prettier/prettier
    const currentTeacher = `${session.teacher.firstName} ${
      session.teacher.lastName
    }`;
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
        selectedTeacher: currentTeacher,
        // startDateOpen: false,
        startDate: startDate.toISOString(),
        // startTimeError: false,
        // startTime: "",
        // privateIndex: null,
        // maxSizeOfClass: 0,
        // courseBool: true,
        // extraTime: false,
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
      groupSelect,
      groupList,
      groupError,
      selectedTeacher,
      teacherOptions,
      teacherError,
      startDate,
      startDateOpen,
      startTimeError,
      startTime,
      startTimeMessage,
    } = this.state;
    const { groupVSPrivate, session } = this.props;
    return (
      <Box>
        <Button
          icon={<Add />}
          label="Edit"
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
            {/* {console.log("!!!! props in edit", this.props)} */}
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
                <Box>
                  {groupVSPrivate === "Private" && (
                    <TypeOfClass
                      typeSelect={privateSelect}
                      setSessionType={this.setSessionType}
                      sessionTypeError={sessionTypeError}
                      typeList={privateList}
                    />
                  )}
                  {groupVSPrivate === "Group" && (
                    <SelectNonAP
                      moneySelect={groupSelect}
                      moneyOptions={groupList}
                      moneyError={groupError}
                      onMoneyChange={this.onGroupChange}
                    />
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
