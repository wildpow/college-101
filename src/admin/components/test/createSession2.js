import React from "react";
import styled from "styled-components";
import { Box, Button, Grommet, Layer, Heading, Select, Text } from "grommet";
import { Add, Close, FormClose, StatusGood, Trash } from "grommet-icons";
import { grommet } from "grommet/themes";

const ErrorText = styled(Text)`
  height: 24px;
`;
class CreateSession extends React.Component {
  state = {
    LayerOpen: false,
    selectedTeacher: "",
    teacherOptions: [],
    courseOptions: [],
    selectedCourse: "",
    teacherError: false,
    courseError: false,
  };

  componentDidMount() {
    const teachersNames = [];
    const courseNames = [];
    this.props.data.teachers.map(teacher =>
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`),
    );
    this.props.data.courses.map(course => courseNames.push(course.name));

    this.setState({
      teacherOptions: teachersNames,
      courseOptions: courseNames,
    });
  }

  onOpen = () => this.setState({ LayerOpen: true });

  onClose = () => this.setState({ LayerOpen: undefined });

  render() {
    const {
      LayerOpen,
      teacherOptions,
      selectedTeacher,
      courseOptions,
      selectedCourse,
      teacherError,
      courseError,
    } = this.state;
    const { data } = this.props;
    const teachersNamesCopy = [];
    const teacherIDs = [];
    data.teachers.map(teacher => {
      teachersNamesCopy.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    const courseNamesCopy = [];
    const courseIDs = [];
    data.courses.map(course => {
      courseNamesCopy.push(course.name);
      courseIDs.push(course.id);
      return null;
    });
    return (
      <Grommet theme={grommet}>
        {/* {console.log("props", this.props)} */}
        {/* {console.log("option", teacherOptions)}
        {console.log("userNames", teacherUserName)} */}
        <Box fill align="center" justify="center">
          <Button icon={<Add />} label="Add Session" onClick={this.onOpen} />
          {LayerOpen && (
            <Layer
              position="right"
              full="vertical"
              modal
              onClickOutside={this.onClose}
              onEsc={this.onClose}
            >
              <Box
                as="form"
                fill="vertical"
                overflow="auto"
                width="medium"
                pad="medium"
                onSubmit={event => {
                  event.preventDefault();
                  if (
                    selectedCourse.length === 0 &&
                    selectedTeacher.length === 0
                  ) {
                    this.setState({
                      teacherError: true,
                      courseError: true,
                    });
                    return null;
                  }
                  if (selectedTeacher.length === 0) {
                    console.log(selectedTeacher.length);
                    this.setState({
                      teacherError: true,
                    });
                    return null;
                  }
                  if (selectedCourse.length === 0) {
                    this.setState({
                      courseError: true,
                    });
                    return null;
                  }
                  return console.log("submit");
                }}
              >
                <Box flex={false} direction="row" justify="between">
                  <Heading level={2} margin="none">
                    Add Session
                  </Heading>
                  <Button icon={<Close />} onClick={this.onClose} />
                </Box>
                <Box
                  flex="grow"
                  overflow="auto"
                  pad={{ vertical: "small" }}
                  // gap="medium"
                >
                  <Box>
                    <Text alignSelf="start" margin="xsmall" size="large">
                      Course
                    </Text>
                    <Select
                      placeholder="Select a Course"
                      value={selectedCourse}
                      onSearch={searchText => {
                        const regexp = new RegExp(searchText, "i");
                        this.setState({
                          courseOptions: courseNamesCopy.filter(o =>
                            o.match(regexp),
                          ),
                        });
                      }}
                      onChange={event =>
                        this.setState({
                          selectedCourse: event.value,
                          courseOptions: courseNamesCopy,
                          courseError: false,
                        })
                      }
                      options={courseOptions}
                    />
                    <ErrorText
                      alignSelf="center"
                      margin="xsmall"
                      size="medium"
                      color="status-critical"
                    >
                      {courseError && `Please select a Course`}
                    </ErrorText>
                  </Box>
                  <Box>
                    <Text alignSelf="start" margin="xsmall" size="large">
                      Teacher
                    </Text>
                    <Select
                      placeholder="Select a Teacher"
                      value={selectedTeacher}
                      onSearch={searchText => {
                        const regexp = new RegExp(searchText, "i");
                        this.setState({
                          teacherOptions: teachersNamesCopy.filter(o =>
                            o.match(regexp),
                          ),
                        });
                      }}
                      onChange={event =>
                        this.setState({
                          selectedTeacher: event.value,
                          teacherOptions: teachersNamesCopy,
                          teacherError: false,
                        })
                      }
                      options={teacherOptions}
                    />
                    {teacherError && (
                      <Text
                        alignSelf="center"
                        margin="xsmall"
                        size="medium"
                        color="status-critical"
                      >
                        Please select a Teacher
                      </Text>
                    )}
                  </Box>
                </Box>
                <Box
                  direction="row"
                  justify="between"
                  margin={{ top: "medium" }}
                >
                  <Button
                    label="Clear"
                    onClick={() =>
                      this.setState({ selectedCourse: "", selectedTeacher: "" })
                    }
                  />
                  <Button type="submit" label="Add" primary />
                </Box>
              </Box>
            </Layer>
          )}
        </Box>
      </Grommet>
    );
  }
}

export default CreateSession;
