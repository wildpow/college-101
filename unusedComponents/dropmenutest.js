import React, { createRef, Component } from "react";

import { Box, Button, Drop } from "grommet";

class ProgressiveDrop extends Component {
  boxRef = createRef();

  state = {
    openDrop: false,
    openInnerDrop: false,
  };

  onCloseDrop = () => this.setState({ openDrop: false, openInnerDrop: false });

  onOpenDrop = () => this.setState({ openDrop: true, openInnerDrop: false });

  render() {
    const { openDrop, openInnerDrop } = this.state;
    return (
      <Box
        width="700px"
        height="500px"
        background="white"
        elevation="large"
        ref={this.boxRef}
      >
        <Box fill align="center" justify="center">
          <Button
            // ref={this.boxRef}
            primary
            label="Click me"
            onClick={this.onOpenDrop}
          />
          {openDrop && (
            <Drop
              target={this.boxRef.current}
              align={{
                left: "left",
              }}
              onClickOutside={this.onCloseDrop}
              onEsc={this.onCloseDrop}
            >
              {!openInnerDrop && (
                <Box
                  // pad="large"
                  animation="slideRight"
                  width="700px"
                  height="500px"
                  align="center"
                  justify="start"
                  background="green"
                >
                  <Button
                    primary
                    label="Click me again"
                    onClick={() => this.setState({ openInnerDrop: true })}
                  />
                </Box>
              )}

              {openInnerDrop && (
                <Box
                  background="purple"
                  pad="large"
                  width="700px"
                  height="500px"
                  animation="slideRight"
                >
                  You can click outside now
                </Box>
              )}
            </Drop>
          )}
        </Box>
      </Box>
    );
  }
}

export default ProgressiveDrop;
