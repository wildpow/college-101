import React from "react";
import { Select } from "grommet";

class UserCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerOptions: [],
      selectedCustomer: "",
      customerCopy: [],
    };
    this.onSearchCustomer = this.onSearchCustomer.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    const customerNames = [];
    data.userloggins.map(customer => customerNames.push(customer.username));
    this.setState({
      customerOptions: customerNames,
      customerCopy: customerNames,
    });
  }

  onSearchCustomer = searchText => {
    const { customerCopy } = this.state;
    const regexp = new RegExp(searchText, "i");
    this.setState({
      customerOptions: customerCopy.filter(o => o.match(regexp)),
    });
  };

  customerSelectChange = event => {
    const { customerCopy } = this.state;
    this.setState({
      selectedCustomer: event.value,
      customerOptions: customerCopy,
    });
  };

  render() {
    const { customerOptions, selectedCustomer } = this.state;
    return (
      <div>
        <Select
          searchPlaceholder="Search Customers"
          placeholder="Select a Customer"
          options={customerOptions}
          value={selectedCustomer}
          onSearch={searchText => this.onSearchCustomer(searchText)}
          onChange={event => this.customerSelectChange(event)}
        />
      </div>
    );
  }
}

export default UserCheck;
