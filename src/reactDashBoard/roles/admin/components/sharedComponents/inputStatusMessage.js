import React from "react";
import PropTypes from "prop-types";
import { Box } from "grommet";
import { StatusGood, StatusWarning } from "grommet-icons";
import { ErrorText } from "../../sharedStyles/sharedStyles";
// size="large"
const InputStatusMessage = props => {
  const { success, toggle, message, size, bottomMessage } = props;
  return (
    <Box
      align="center"
      justify="between"
      direction="row"
      gap="xsmall"
      margin={{ horizontal: "small" }}
    >
      {console.log(bottomMessage)}
      <ErrorText
        newHeight={size === "large" ? "80px" : "24px"}
        bottomMessage={bottomMessage}
        size={size}
        weight="bold"
        color={success ? "status-ok" : "status-critical"}
      >
        {toggle && <Box animation="fadeIn">{message}</Box>}
      </ErrorText>
      {toggle && (
        <>
          {success ? (
            <Box animation="fadeIn">
              <StatusGood size={size} color="status-ok" />
            </Box>
          ) : (
            <Box animation="fadeIn">
              <StatusWarning size={size} color="status-critical" />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
InputStatusMessage.defaultProps = {
  bottomMessage: false,
  message: "Default error or success message.",
  toggle: false,
  success: false,
  size: "medium",
};

InputStatusMessage.propTypes = {
  bottomMessage: PropTypes.bool,
  message: PropTypes.string,
  toggle: PropTypes.bool,
  success: PropTypes.bool,
  size: PropTypes.string,
};
export default InputStatusMessage;
