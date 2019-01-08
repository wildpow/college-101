import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import ErrorMessage from "./errorMessage";

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.5em 3em;
  border: 0.16em solid green;
  margin-top: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Verdana, sans-serif;
  font-weight: 400;
  color: black;
  text-align: center;
  transition: all 0.15s;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #dddddd;
    border-color: #dddddd;
  }
  &:active {
    color: #bbbbbb;
    border-color: #bbbbbb;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0px 15px 15px 15px;
  height: 100%;

  input {
    padding: 10px;
    margin: 5px;
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
      errorMessage: "",
    };
  }

  userNameExists = () => {
    const { data } = this.props;
    const { userName } = this.state;
    const userNameArray = data.teachers.map(el => el.userName);
    const a = userNameArray.includes(userName.toLowerCase());
    console.log("data", data);
    console.log("filter", a);
    console.log("userNamearr", userNameArray);
    if (a) {
      this.setState({
        errorMessage: "User already exists",
      });
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

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
                  if (!this.userNameExists()) {
                    createTeacher({
                      variables: {
                        firstName: firstName.toLowerCase(),
                        lastName: lastName.toLowerCase(),
                        userName: userName.toLowerCase(),
                      },
                    });
                    this.setState({
                      userName: "",
                      firstName: "",
                      lastName: "",
                    });
                    return console.log("success"); // placeholder for success massage
                  }
                  return console.log("UserName already exists"); // placeholder for 'User already exists'
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
                <ErrorMessage errorMessage={this.state.errorMessage} />
                <Button type="submit">Add Teacher</Button>
              </Form>
            </div>
          )}
        </Mutation>
      </>
    );
  }
}

CreateTeacher.propTypes = {
  teachers: PropTypes.instanceOf(Object).isRequired,
};

export default CreateTeacher;
