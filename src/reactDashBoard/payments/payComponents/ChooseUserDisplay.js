import React from "react";
import { Select, Button, Box, Heading } from "grommet";
import states from "../States";
import { PaymentContext } from "../context";

class UserCheckDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerOptions: [],
      selectedCustomer: "",
      customerOptionsCopy: [],
    };
    this.onSearchCustomer = this.onSearchCustomer.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    const customerNames = [];
    data.userloggins.map(customer => customerNames.push(customer.username));
    this.setState({
      customerOptions: customerNames,
      customerOptionsCopy: customerNames,
    });
  }

  onSearchCustomer = searchText => {
    const { customerOptionsCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      customerOptions: customerOptionsCopy.filter(o => o.match(regexp)),
    });
  };

  customerSelectChange = event => {
    const { customerOptionsCopy } = this.state;
    this.setState({
      selectedCustomer: event.value,
      customerOptions: customerOptionsCopy,
    });
  };

  onCreate = context => {
    const { customerOptionsCopy } = this.state;
    const { next } = this.props;
    context.getExistingUsers(customerOptionsCopy);
    next(states.CREATEUSER);
  };

  onConfirm = context => {
    // console.log(context);
    // console.log("ppop");
    const { selectedCustomer } = this.state;
    const { next } = this.props;
    context.setCurrentUser(selectedCustomer);
    // localStorage.setItem("existingUserName", selectedCustomer);
    next(states.EXISTINGUSER);
  };

  render() {
    const { customerOptions, selectedCustomer } = this.state;
    return (
      <>
        <PaymentContext.Consumer>
          {context => (
            <Box
              direction="column"
              justify="center"
              flex={false}
              alignContent="center"
              alignSelf="center"
            >
              <Box pad="medium" align="center">
                <Heading level={3}>check if customer exists</Heading>
                <Box direction="column" gap="xsmall">
                  <Select
                    searchPlaceholder="Search Customers"
                    placeholder="Select a Customer"
                    options={customerOptions}
                    value={selectedCustomer}
                    onSearch={searchText => this.onSearchCustomer(searchText)}
                    onChange={event => this.customerSelectChange(event)}
                  />
                  <Box height="50px">
                    {selectedCustomer.length === 0 ? null : (
                      <Box animation="zoomIn">
                        <Button
                          type="button"
                          label="Confirm"
                          onClick={() => this.onConfirm(context)}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box pad="medium">
                <Heading align="center" alignSelf="center" level={3}>
                  Or create new customer
                </Heading>
                <Button
                  primary
                  type="button"
                  label="Create New"
                  onClick={() => this.onCreate(context)}
                />
              </Box>
            </Box>
          )}
        </PaymentContext.Consumer>
      </>
    );
  }
}

export default UserCheckDisplay;
