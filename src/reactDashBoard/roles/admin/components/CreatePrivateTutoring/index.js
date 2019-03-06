import React from "react";
import { Button, Layer, Box } from "grommet";
import { Add } from "grommet-icons";
import LayerHeader from "../../layerHeader";
import TypeOfClass from "./typeOfClass";

class PrivateTutoring extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      layer: false,
      typeSelect: "",
      sessionTypeError: false,
    };
  }

  layerToggle = changeAction => {
    if (changeAction) {
      this.setState({ layer: true });
    } else {
      this.setState({
        layer: false,
        typeSelect: "",
        sessionTypeError: false,
      });
    }
  };

  setSessionType = event => {
    this.setState({ typeSelect: event.value });
  };

  render() {
    const { typeSelect, layer, sessionTypeError } = this.state;
    const { privateTutorings } = this.props;
    return (
      <Box>
        {console.log(this.props)}
        <Button
          icon={<Add />}
          label="Private Tutoring"
          onClick={() => this.layerToggle(true)}
          primary
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
              headingText="Private Tutoring"
              modelFunc={this.layerToggle}
            />
            <Box
              gap="small"
              fill="vertical"
              overflow="auto"
              width="medium"
              pad="medium"
              as="form"
            >
              <Box fill overflow="scroll" justify="between">
                <Box>
                  <TypeOfClass
                    typeSelect={typeSelect}
                    privateTutorings={privateTutorings}
                    setSessionType={this.setSessionType}
                    sessionTypeError={sessionTypeError}
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

export default PrivateTutoring;
