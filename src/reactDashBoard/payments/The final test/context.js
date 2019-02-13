import React from "react";

export const PaymentContext = React.createContext();

class PayWizardContext extends React.Component {
  state = {
    selectedUser: "",
    currentUserName: "",
    usersData: [],
    userNames: [],
    userNamesCopy: [],
    newUser: {},
    userCheckBool: true,
    createUserBool: false,
    chooseClassBool: false,
    email: "",
    emailError: false,
    street: "",
    city: "",
    state: "",
    zip: "",
    user: [],
  };

  onChangeEmail = event =>
    this.setState({ email: event.target.value, emailError: false });

  setUser = user => {
    this.setState({ user });
  };

  onCreateNewUser = event => {
    event.preventDefault();
    const {
      userNames,
      email,
      firstName,
      lastName,
      street,
      state,
      city,
      zip,
    } = this.state;
    if (userNames.indexOf(email.toLowerCase()) === -1) {
      const user = {
        firstName,
        lastName,
        street,
        city,
        state,
        zip,
        email,
      };
      this.setUser(user);
      this.setState({
        chooseClassBool: true,
        userCheckBool: false,
        createUserBool: false,
      });
    } else {
      this.setState({ emailError: true });
    }
  };

  confirmExistingUser = currentUserName => {
    const { usersData } = this.state;
    usersData.userloggins.map(user => {
      if (user.username === currentUserName) {
        this.setUser(user);
      }
    });
    this.setState({
      currentUserName,
      userCheckBool: false,
      chooseClassBool: true,
    });
  };

  newUserButton = () => {
    this.setState({
      createUserBool: true,
      userCheckBool: false,
    });
  };

  getExistingUsers = users => {
    this.setState({
      userNames: users,
      userNamesCopy: users,
    });
  };

  setUserData = data => {
    this.setState({
      usersData: data,
    });
  };

  onSearchCustomer = searchText => {
    const { userNamesCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      userNames: userNamesCopy.filter(o => o.match(regexp)),
    });
  };

  customerSelectChange = event => {
    this.setState({
      selectedUser: event.value,
    });
  };

  onChangeAdress = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeFirst = event => this.setState({ firstName: event.target.value });

  onChangeLast = event => this.setState({ lastName: event.target.value });

  render() {
    return (
      <PaymentContext.Provider
        value={{
          state: this.state,
          setCurrentUser: this.setCurrentUser,
          setUserData: this.setUserData,
          getExistingUsers: this.getExistingUsers,
          setUser: this.setUser,
          onSearchCustomer: this.onSearchCustomer,
          customerSelectChange: this.customerSelectChange,
          newUserButton: this.newUserButton,
          onCreateNewUser: this.onCreateNewUser,
          onChangeEmail: this.onChangeEmail,
          onChangeLast: this.onChangeLast,
          onChangeFirst: this.onChangeFirst,
          onChangeAdress: this.onChangeAdress,
          confirmExistingUser: this.confirmExistingUser,
        }}
      >
        {this.props.children}
      </PaymentContext.Provider>
    );
  }
}

export default PayWizardContext;
