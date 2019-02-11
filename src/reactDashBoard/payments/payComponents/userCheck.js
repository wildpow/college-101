import React from "react";
import { Select, Button, Box } from "grommet";
import states from "../States";
import { PaymentContext } from "../context";

class UserCheck extends React.Component {
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
            <>
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
            </>
          )}
        </PaymentContext.Consumer>
      </>
    );
  }
}

export default UserCheck;
