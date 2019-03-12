import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Layer, Heading, Box, Text } from "grommet";
import { FormClose } from "grommet-icons";
import { TitleWrapper } from "../../sharedStyles/slideLayer";

const ViewReceipt = props => {
  const { data } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} label="View Receipt" />
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
              View Receipt
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
              <Box direction="column" gap="xsmall">
                <Text size="xlarge" weight="bold">
                  Created on:
                </Text>

                <Text size="large">
                  {new Date(data.receipt.createdAt).toDateString()}
                </Text>
              </Box>
              <Box direction="column" gap="xsmall">
                <Text size="xlarge" weight="bold">
                  Payee:
                </Text>
                <Text size="large">
                  {`${data.receipt.userloggin.firstName} ${
                    data.receipt.userloggin.lastName
                  }`}
                </Text>
              </Box>
              <Box direction="column" gap="xsmall">
                <Text size="xlarge" weight="bold">
                  Email:
                </Text>
                <Text size="large">{data.receipt.userloggin.username}</Text>
              </Box>
              <Box direction="column" gap="xsmall">
                <Text size="xlarge" weight="bold">
                  Student:
                </Text>
                <Text size="large">
                  {`${data.receipt.student.firstName} ${
                    data.receipt.student.lastName
                  }`}
                </Text>
              </Box>
              <Box direction="column" gap="xsmall">
                <Text size="xlarge" weight="bold">
                  Payment Type:
                </Text>
                <Text size="large">{data.receipt.paymentMethod}</Text>
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

ViewReceipt.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
export default ViewReceipt;
