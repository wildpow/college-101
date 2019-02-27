import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Layer, Text } from "grommet";
import { FormClose, StatusGood } from "grommet-icons";

const Messages = props => {
  const { event, message, setEvent } = props;
  return (
    <>
      {event && (
        <Layer
          margin={{ bottom: "20px" }}
          position="bottom"
          // full="horizontal"
          modal={false}
          responsive={false}
          onEsc={() => setEvent(false)}
        >
          <Box
            background="floralwhite"
            align="start"
            pad={{ vertical: "medium", horizontal: "small" }}
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              round="medium"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
              background="status-ok"
            >
              <Box align="center" direction="row" gap="medium">
                <StatusGood size="large" />
                <Text size="xlarge" weight="bold">
                  {message}
                </Text>
              </Box>
              <Button
                icon={<FormClose size="large" />}
                onClick={() => setEvent(false)}
                plain
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

Messages.defaultProps = {
  event: false,
  message: "Hello World",
};

Messages.propTypes = {
  setEvent: PropTypes.func.isRequired,
  event: PropTypes.bool,
  message: PropTypes.string,
};
export default Messages;
