import React from "react";
import { Box, Button, Heading, Form, FormField, TextInput } from "grommet";
import states from "../States";
import { ErrorText } from "../../roles/admin/components/createSession/sharedStyles";
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

    const { users } = this.state;
    if (users.indexOf(this.state.email) === -1) {
      console.log("success");
    } else {
      this.setState({ emailError: true });
    }
    // const regexp = new RegExp(value, "i");
    // const match = users.map(o => {
    //   if (o.indexOf(regexp) !== -1) {
    //     return "User exists";
    //   }
    //   return "";
    // });
    // console.log("regexp", regexp);

    // const found = users.indexOf(regexp);
    // if (found !== -1) {
    //   return "user exists";
    // }
    // console.log("stuf", value, "stuf2", obj);
    // console.log("match", found);
    // console.log("users", users);
    // return "";
  };

  render() {
    const { emailError, email } = this.state;
    return (
      <Box>
        {/* {console.log(this.state)} */}
        <Heading level={2}>Create User</Heading>

        <Form onSubmit={event => this.onSubmit(event)}>
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
