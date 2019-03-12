import React from "react";
import PropTypes from "prop-types";
import Display from "../display";
import QueryAllUsers from "../../../../../queryComponents/QueryAllUsers";

class UpdateState extends React.Component {
  static propTypes = {
    getExistingUsers: PropTypes.func.isRequired,
    setUserData: PropTypes.func.isRequired,
    data: PropTypes.shape({ type: PropTypes.oneOf([QueryAllUsers]) })
      .isRequired,
  };

  componentWillMount() {
    const { data, getExistingUsers, setUserData } = this.props;
    const customerNames = [];
    data.userloggins.map(customer => customerNames.push(customer.username));
    getExistingUsers(customerNames);
    setUserData(data);
  }

  render() {
    return (
      <>
        <Display />
      </>
    );
  }
}

export default UpdateState;
