import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

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
    };
  }

  userNameExists = () => {
    const { teachers } = this.props;
    const { userName } = this.state;
    const userNameArray = teachers.map(el => el.userName);
    const a = userNameArray.includes(userName.toLowerCase());
    return a;
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // const userNameArray = this.props.teachers.map(el => el.userName);
    // const regexUserName = new RegExp(userNameArray.join("|"), "gi");

    const { firstName, lastName, userName } = this.state;
    return (
      <Mutation mutation={ADD_TEACHER}>
        {(createTeacher, { data }) => (
          <div>
            <h2>Create Teacher</h2>
            <form
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
                  this.setState({ userName: "", firstName: "", lastName: "" });
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
              <button type="submit">Add Teacher</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTeacher;
