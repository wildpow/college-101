import React from "react";
import styled from "styled-components";
import { Box, Button, Heading, Form, FormField, TextInput } from "grommet";
import { PaymentContext } from "./setup/context";
import { ErrorText } from "../../sharedStyles/sharedStyles";

const BottomBoardHover = styled(Box)`
  div :nth-child(2) {
    border-bottom: ${props =>
      props.error ? `solid 1px #f04953` : `solid 1px rgba(0, 0, 0, 0.33)`};
  }
`;

const CreateUser = () => {
  return (
    <PaymentContext.Consumer>
      {context => (
        <Box>
          <Heading level={2}>Create User</Heading>

          <Form onSubmit={event => context.onCreateNewUser(event)}>
            <BottomBoardHover error={context.state.emailError}>
              <FormField
                // htmlFor="userName-input"
                type="email"
                required
                label="email"
                // validate={(value, obj) => this.poop(value, obj)}
              >
                <TextInput
                  autoComplete="email"
                  onChange={event => context.onChangeEmail(event)}
                  value={context.state.email}
                  // id="userName-input"
                  placeholder="example@domain.com"
                  type="email"
                  required
                  name="email"
                />
                <ErrorText
                  alignSelf="center"
                  margin="xsmall"
                  size="medium"
                  color="status-critical"
                >
                  {context.state.emailError && "User name already exists"}
                </ErrorText>
              </FormField>
            </BottomBoardHover>
            <FormField label="First Name">
              <TextInput
                type="text"
                required
                value={context.state.firstName}
                onChange={event => context.onChangeFirst(event)}
                autoComplete="given-name"
                name="firstName"
              />
            </FormField>
            <FormField label="Last Name">
              <TextInput
                type="text"
                required
                value={context.state.lastName}
                onChange={event => context.onChangeLast(event)}
                autoComplete="family-name"
                name="lastName"
              />
            </FormField>
            <FormField label="Address">
              <Box direction="column">
                <TextInput
                  label="street"
                  required
                  onChange={event => context.onChangeAdress(event)}
                  autoComplete="street-address address-line1"
                  // autoComplete="section-red shipping street-address"
                  value={context.state.street}
                  name="street"
                />
                <Box direction="row">
                  <TextInput
                    label="City"
                    required
                    onChange={event => context.onChangeAdress(event)}
                    autoComplete=" street-address address-level2"
                    // autoComplete="section-red shipping address-level2"
                    value={context.state.city}
                    name="city"
                  />
                  <TextInput
                    label="State"
                    required
                    onChange={event => context.onChangeAdress(event)}
                    autoComplete="street-address address-level1"
                    value={context.state.state}
                    name="state"
                  />
                  <TextInput
                    label="zip code"
                    required
                    onChange={event => context.onChangeAdress(event)}
                    autoComplete="street-address postal-code"
                    // autocomplete="section-red shipping postal-code"
                    value={context.state.zip}
                    name="zip"
                  />
                </Box>
              </Box>
            </FormField>

            <Box gap="small" flex direction="row" justify="between">
              <Button type="submit" label="create" primary />

              <Button
                type="button"
                label="Clear"
                onClick={() => context.clearCreateForm()}
              />
              <Button
                type="button"
                label="Back"
                onClick={() => context.backOne("create")}
              />
            </Box>
          </Form>
        </Box>
      )}
    </PaymentContext.Consumer>
  );
};

export default CreateUser;
