import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Heading, Button } from "grommet";
import { FormClose } from "grommet-icons";

const TitleWrapper = styled(Box)`
  button {
    padding: 0;
  }
  h2 {
    align-self: center;
  }
  button svg:hover {
    transition: all 250ms ease-in-out;
    stroke: black;
    fill: black;
  }
`;
// modelFunc can be a hook or function from class component
const LayerHeader = props => {
  const { headingText, modelFunc } = props;
  return (
    <TitleWrapper
      background="#61a785"
      flex={false}
      direction="row"
      justify="between"
      elevation="medium"
      pad={{
        left: "medium",
        right: "medium",
        top: "xsmall",
        bottom: "xsmall",
      }}
    >
      <Heading level={2} margin="none" color="floralwhite">
        {headingText}
      </Heading>
      <Button
        icon={<FormClose color="floralwhite" size="large" />}
        onClick={() => modelFunc(false)}
      />
    </TitleWrapper>
  );
};

LayerHeader.defaultProps = {
  headingText: "Default Heading",
};
LayerHeader.propTypes = {
  modelFunc: PropTypes.func.isRequired,
  headingText: PropTypes.string,
};

export default LayerHeader;
