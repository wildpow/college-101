import React, { useState } from "react";
import { Button, Layer, Heading, Box } from "grommet";
import { FormClose } from "grommet-icons";
import { TitleWrapper } from "../../sharedStyles/slideLayer";

const EditSession = props => {
  const { startTimeCheck, endTimeTimeCheck } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      {startTimeCheck && endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Edit Session" disabled />
      )}
      {startTimeCheck && !endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Edit Session" />
      )}
      {!startTimeCheck && !endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Edit Session" />
      )}
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <TitleWrapper
            background="#61a785"
            flex={false}
            direction="row"
            justify="between"
            elevation="xlarge"
            pad={{
              left: "medium",
              right: "medium",
              top: "xsmall",
              bottom: "xsmall",
            }}
          >
            <Heading level={2} margin="none" color="floralwhite">
              Edit Session
            </Heading>
            <Button
              icon={<FormClose color="floralwhite" size="large" />}
              onClick={() => setOpen(false)}
            />
          </TitleWrapper>
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            as="form"
            // gap="small"
            // fill
            // overflow="scroll"
            // width="large"
            // pad={{
            //   left: "medium",
            //   right: "medium",
            //   top: "small",
            //   bottom: "medium",
            // }}
          >
            <Box
              fill
              justify="start"
              overflow="scroll"
              pad={{ vertical: "small" }}
              gap="medium"
            >
              Edit Session
              {`props of session passed down from parent gives everything to populate this component. Example:\n ${
                props.session.id
              }`}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default EditSession;
