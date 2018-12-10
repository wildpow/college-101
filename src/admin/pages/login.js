import React from "react";
import { navigate } from "gatsby";
import { handleLogin } from "../services/auth";

class Login extends React.Component {
  handleSubmit = () => handleLogin(user => navigate(`/admin`));

  render() {
    return (
      <>
        <h1>Log in</h1>
        <button type="button" onClick={this.handleSubmit}>
          log in
        </button>
      </>
    );
  }
}

export default Login;
