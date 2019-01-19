import React from "react";
import styled from "styled-components";
import { Box, Button, Grommet, Layer, Heading } from "grommet";
import { Add, Close, FormClose, StatusGood, Trash } from "grommet-icons";
import { grommet } from "grommet/themes";

class CreateSession extends React.Component {
  state = { open: false, select: "" };

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: undefined });

  render() {
    const { open, select } = this.state;

    return (
      <Grommet theme={grommet}>
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
                  <h1>blblb</h1>
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
