import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
// import PropTypes from "prop-types";
import ErrorMessage from "./errorMessage";
import { Button, ErrorWrapper } from "./sharedStyles";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0px 15px 15px 15px;
  height: 100%;
  margin-top: 20px;

  input {
    padding: 10px;
    margin: 5px;
    width: 80%;
    font-family: Verdana, sans-serif;
  }
`;
const ADD_TEACHER = gql`
  mutation CreateTeacher(
    $firstName: String!
    $lastName: String!
    $userName: String!
  ) {
    createTeacher(
      data: {
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        status: PUBLISHED
        teachersStatus: Active
      }
    ) {
      firstName
      lastName
      userName
      status
      teachersStatus
    }
  }
`;

class CreateTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      error: false,
    };
  }

  userNameExists = () => {
    const { data } = this.props;
    const { userName } = this.state;
    const userNameArray = data.teachers.map(el => el.userName);
    const a = userNameArray.includes(userName.toLowerCase());
    return a;
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value, error: false });

  render() {
    // const userNameArray = this.props.teachers.map(el => el.userName);
    // const regexUserName = new RegExp(userNameArray.join("|"), "gi");
    const { firstName, lastName, userName } = this.state;
    return (
      <>
        <Mutation mutation={ADD_TEACHER}>
          {(createTeacher, { data }) => (
            <div>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  if (this.userNameExists()) {
                    this.setState({ error: true });
                  } else {
                    createTeacher({
                      variables: {
                        firstName: firstName.toLowerCase(),
                        lastName: lastName.toLowerCase(),
                        userName: userName.toLowerCase(),
                      },
                    });
                    this.setState(
                      {
                        userName: "",
                        firstName: "",
                        lastName: "",
                      },
                      this.props.handleFlip(),
                    );
                  }
                  return null;
                }}
              >
                <input
                  required
                  title="First Name"
                  name="firstName"
                  type="Text"
                  placeholder="first Name"
                  value={firstName}
                  onChange={this.handleChange}
                />
                <input
                  required
                  title="Last Name"
                  name="lastName"
                  type="Text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.handleChange}
                />
                <input
                  required
                  title="User Name"
                  name="userName"
                  type="email"
                  placeholder="User Name"
                  value={userName}
                  onChange={this.handleChange}
                />
                <ErrorWrapper>
                  {this.state.error && (
                    <ErrorMessage userName={this.state.userName} />
                  )}
                </ErrorWrapper>
                <Button type="submit">Add Teacher</Button>
              </Form>
            </div>
          )}
        </Mutation>
      </>
    );
  }
}

export default CreateTeacher;
