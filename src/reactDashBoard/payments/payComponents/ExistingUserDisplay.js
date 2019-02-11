import React from "react";
import { Text, Box, Button } from "grommet";
import states from "../States";

import { PaymentContext } from "../payPages/context";

class ExistingUserDisplay extends React.Component {
  confirm = (context, data) => {
    const { next } = this.props;
    context.setUserData(data);
    next(states.PICKCLASS);
  };

  render() {
    const { data, back } = this.props;
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
        <Box
          gap="large"
          flex
          direction="row"
          justify="center"
          margin={{ top: "medium" }}
        >
          <Button
            onClick={() => back(states.CHOOSEUSER)}
            type="button"
            label="Back"
          />
          <PaymentContext.Consumer>
            {context => (
              <Button
                onClick={() => this.confirm(context, data)}
                type="button"
                label="Confirm"
                primary
              />
            )}
          </PaymentContext.Consumer>
        </Box>
      </Box>
    );
  }
}

export default ExistingUserDisplay;
