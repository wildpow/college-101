import React from "react";
import styled from "styled-components";
import { Box, Button, Grommet, Layer, Heading, Select } from "grommet";
import { Add, Close, FormClose, StatusGood, Trash } from "grommet-icons";
import { grommet } from "grommet/themes";

class CreateSession extends React.Component {
  state = { open: false, value: [], options: [] };

  componentDidMount() {
    const teachersNames = [];
    this.props.data.teachers.map(teacher => {
      teachersNames.push(`${teacher.firstName} ${teacher.lastName}`);
      return null;
    });
    this.setState({ options: teachersNames });
  }

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: undefined });

  render() {
    const { open, options, value } = this.state;
    const { data } = this.props;
    const teachersNamesCopy = [];
    const teacherIDs = [];
    data.teachers.map(teacher => {
      teachersNamesCopy.push(`${teacher.firstName} ${teacher.lastName}`);
      teacherIDs.push(teacher.id);
      return null;
    });
    return (
      <Grommet theme={grommet}>
        {/* {console.log("state", this.state)}
        {console.log("option", teacherOptions)}
        {console.log("userNames", teacherUserName)} */}

        <Box fill align="center" justify="center">
          <Button icon={<Add />} label="Add Session" onClick={this.onOpen} />
          {open && (
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
                onSubmit={this.onClose}
              >
                <Box flex={false} direction="row" justify="between">
                  <Heading level={2} margin="none">
                    Add Session
                  </Heading>
                  <Button icon={<Close />} onClick={this.onClose} />
                </Box>
                <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                  <Select
                    placeholder="Select a Teacher"
                    value={value}
                    onSearch={searchText => {
                      const regexp = new RegExp(searchText, "i");
                      this.setState({
                        options: teachersNamesCopy.filter(o => o.match(regexp)),
                      });
                    }}
                    onChange={event =>
                      this.setState({
                        value: event.value,
                        options: teachersNamesCopy,
                      })
                    }
                    options={options}
                  />
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
