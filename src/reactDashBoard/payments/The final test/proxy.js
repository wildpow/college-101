import React from "react";
import Display from "./display";

class Proxy extends React.Component {
  componentWillMount() {
    const { data, getExistingUsers, setUserData } = this.props;
    const customerNames = [];
    data.userloggins.map(customer => customerNames.push(customer.username));
    getExistingUsers(customerNames);
    setUserData(data);
  }

  render() {
    return <Display />;
  }
}

export default Proxy;
