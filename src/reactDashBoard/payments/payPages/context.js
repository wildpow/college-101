import React from "react";

export const PaymentContext = React.createContext();

class Highest extends React.Component {
  state = {
    currentUserName: "",
    userData: [],
  };

  setCurrentUser = currentUserName => {
    this.setState({
      currentUserName,
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
        }}
      >
        {this.props.children}
      </PaymentContext.Provider>
    );
  }
}

export default Highest;
