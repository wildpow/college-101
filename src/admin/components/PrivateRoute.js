import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn } from "../services/auth";

class PrivateRoute extends React.Component {
  componentDidMount = () => {
    const { location } = this.props;
    if (!isLoggedIn() && location.pathname !== `/admin/login`) {
      // If the user is not logged in, redirect to the login page.
      navigate(`/admin/login`);
      return null;
    }
  };

  render() {
    const { component: Component, location, ...rest } = this.props;
    return isLoggedIn() ? <Component {...rest} /> : null;
  }
}

export default PrivateRoute;
