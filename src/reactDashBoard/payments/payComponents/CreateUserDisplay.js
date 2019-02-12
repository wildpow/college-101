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
    const { users, email } = this.state;
    if (users.indexOf(email.toLowerCase()) === -1) {
      console.log("success");
    } else {
      this.setState({ emailError: true });
    }
  };

  render() {
    const { emailError, email } = this.state;
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
                onChange={event => this.onChange(event)}
                value={email}
                // id="userName-input"
                placeholder="example@domain.com"
                type="email"
                required
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
