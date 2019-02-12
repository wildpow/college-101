import React from "react";

export const PaymentContext = React.createContext();

class PayWizardContext extends React.Component {
  state = {
    currentUserName: "",
    userData: [],
    userNames: [],
  };

  setCurrentUser = currentUserName => {
    this.setState({
      currentUserName,
    });
  };

  getExistingUsers = users => {
    this.setState({
      userNames: users,
    });
  };

  setUserData = data => {
    this.setState({
      userData: data,
    });
  };

  render() {
    return (
      <PaymentContext.Provider
        value={{
          state: this.state,
          setCurrentUser: this.setCurrentUser,
          setUserData: this.setUserData,
          getExistingUsers: this.getExistingUsers,
        }}
      >
        {this.props.children}
      </PaymentContext.Provider>
    );
  }
}

export default PayWizardContext;
