import React from "react";
import { Box, Button, Heading, Form, FormField, TextInput } from "grommet";
import styled from "styled-components";
import states from "../States";
import { ErrorText } from "../../roles/admin/components/createSession/sharedStyles";

const BottomBoardHover = styled(Box)`
  div :nth-child(2) {
    border-bottom: ${props =>
      props.error ? `solid 1px #f04953` : `solid 1px rgba(0, 0, 0, 0.33)`};
  }
`;
class CreateUserDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: "",
      emailError: false,
      street: "",
      city: "",
      state: "",
      zip: "",
    };
  }

  componentWillMount() {
    const { users } = this.props;
    this.setState({ users });
  }

  onChange = event =>
    this.setState({ email: event.target.value, emailError: false });

  onSubmit = event => {
    event.preventDefault();
    const {
      users,
      email,
      firstName,
      lastName,
      street,
      state,
      city,
      zip,
    } = this.state;
    if (users.indexOf(email.toLowerCase()) === -1) {
      const newUser = {
        firstName,
        lastName,
        street,
        city,
        state,
        zip,
        email,
      };
      this.props.setNewUser(newUser);
      this.props.next(states.PICKCLASS);
    } else {
      this.setState({ emailError: true });
    }
  };

  onChangeAdress = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeFirst = event => this.setState({ firstName: event.target.value });

  onChangeLast = event => this.setState({ lastName: event.target.value });

  render() {
    const {
      emailError,
      email,
      firstName,
      lastName,
      street,
      city,
      zip,
      state,
    } = this.state;
    return (
      <Box>
        {/* {console.log(this.state)} */}
        <Heading level={2}>Create User</Heading>

        <Form onSubmit={event => this.onSubmit(event)}>
          <BottomBoardHover error={emailError}>
            <FormField
              // htmlFor="userName-input"
              type="email"
              required
              {...this.props}
              label="email"
              // validate={(value, obj) => this.poop(value, obj)}
            >
              <TextInput
                autoComplete="email"
                onChange={event => this.onChange(event)}
                value={email}
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
                {emailError && "User name already exists"}
              </ErrorText>
            </FormField>
          </BottomBoardHover>
          <FormField label="First Name">
            <TextInput
              type="text"
              required
              value={firstName}
              onChange={event => this.onChangeFirst(event)}
              autoComplete="given-name"
              name="firstName"
            />
          </FormField>
          <FormField label="Last Name">
            <TextInput
              type="text"
              required
              value={lastName}
              onChange={event => this.onChangeLast(event)}
              autoComplete="family-name"
              name="lastName"
            />
          </FormField>
          <FormField label="Address">
            <Box direction="column">
              <TextInput
                label="street"
                required
                onChange={event => this.onChangeAdress(event)}
                autoComplete="street-address address-line1"
                // autoComplete="section-red shipping street-address"
                value={street}
                name="street"
              />
              <Box direction="row">
                <TextInput
                  label="City"
                  required
                  onChange={event => this.onChangeAdress(event)}
                  autoComplete=" street-address address-level2"
                  // autoComplete="section-red shipping address-level2"
                  value={city}
                  name="city"
                />
                <TextInput
                  label="State"
                  required
                  onChange={event => this.onChangeAdress(event)}
                  autoComplete="street-address address-level1"
                  value={state}
                  name="state"
                />
                <TextInput
                  label="zip code"
                  required
                  onChange={event => this.onChangeAdress(event)}
                  autoComplete="street-address postal-code"
                  // autocomplete="section-red shipping postal-code"
                  value={zip}
                  name="zip"
                />
              </Box>
              {console.log(this.state)}
            </Box>
          </FormField>
          {/* <FormField
            label="Email"
            name="email"
            type="email"
            required
            validate={this.poop}
          /> */}

          <Box gap="small" flex direction="row">
            <Button
              onClick={() => this.props.back(states.CHOOSEUSER)}
              type="button"
              label="back"
            />
            <Button type="submit" label="create" primary />
            {/* <Button
              onClick={() => this.props.next(states.PICKCLASS)}
              type="button"
              label="Submit"
              primary
            /> */}
          </Box>
        </Form>
      </Box>
    );
  }
}

export default CreateUserDisplay;
