import React from "react";
import { Text, Box } from "grommet";

const ExistingUserDisplay = props => {
  const { data } = props;
  return (
    <Box gap="large">
      <Box>
        <Text size="xlarge" weight="bold">
          User Name:
        </Text>
        <Text size="large">{data.userloggin.username}</Text>
      </Box>
      <Box>
        <Text weight="bold" size="xlarge">
          Address:
        </Text>
        <Text size="large">{data.userloggin.mailingAddress[0]}</Text>
        <Text size="large">
          {`${data.userloggin.mailingAddress[1]} 
      ${data.userloggin.mailingAddress[2]} 
      ${data.userloggin.mailingAddress[3]}`}
        </Text>
      </Box>
      {/* {console.log(data.userloggin)} */}
    </Box>
  );
};

export default ExistingUserDisplay;
