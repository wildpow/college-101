import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import { Button, Layer, Box, Text, CheckBox } from "grommet";
import { AddCircle, ScheduleNew, Trash } from "grommet-icons";
import LayerHeader from "../../admin/components/sharedComponents/layerHeader";

const ADD_ATTENDANCE = gql`
  mutation(
    $sessionId: ID
    $userName: String
    $students: [StudentWhereUniqueInput!]
    $extraStudents: AttendanceCreateextraStudentsInput
    $notes: AttendanceCreatenotesInput
  ) {
    createAttendance(
      data: {
        session: { connect: { id: $sessionId } }
        createdByUser: { connect: { userName: $userName } }
        status: PUBLISHED
        students: { connect: $students }
        extraStudents: $extraStudents
        notes: $notes
      }
    ) {
      id
    }
  }
`;

class TakeAttendance extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      presentStudents: [],
      extraStudentsArr: [],
      notes: [],
      inputExtraStudents: "",
      layer: false,
    };
  }

  layerToggle = changeAction => {
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        layer: false,
      });
    }
  };

  render() {
    const { layer } = this.state;
    return (
      <>
        <Button
          icon={<AddCircle />}
          label={<Text truncate>Take Attendance</Text>}
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
              headingText="Take Attendance"
              modelFunc={this.layerToggle}
            />
          </Layer>
        )}
      </>
    );
  }
}

export default TakeAttendance;
