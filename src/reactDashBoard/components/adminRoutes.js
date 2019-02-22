import React from "react";
import { navigate } from "gatsby";
import { isLoggedIn, getUser } from "../services/auth";

class AdminRoutes extends React.Component {
  componentDidMount = () => {
    const { location } = this.props;
    if (!isLoggedIn() && location.pathname !== `/dashboard/login`) {
      // If the user is not logged in, redirect to the login page.
      navigate(`/dashboard/login`);
      return null;
    }
    return null;
  };

  render() {
    const { component: Component, location, ...rest } = this.props;
    if (isLoggedIn()) {
      const user = getUser();
      const role = user.app_metadata.roles;
      if (role === undefined) {
        return <h1>Unathurized Route</h1>;
      }
      return <Component {...rest} />;
    }
    return null;
  }
}
export default AdminRoutes;
