import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Heading, Box, Text } from "grommet";
import { FormClose } from "grommet-icons";
import { TitleWrapper } from "../../sharedStyles/slideLayer";

const AddStudent = props => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} label="Add Student" />
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
              Add Student
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
              add student
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default AddStudent;