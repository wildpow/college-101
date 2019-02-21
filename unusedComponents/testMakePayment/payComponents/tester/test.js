import React from "react";
import styled from "styled-components";
import { Select, Button, Box, Heading } from "grommet";
import CreateTest from "./createtest";
import { PaymentContext } from "./context";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  display: ${props => (props.disabler ? "none" : "")};
`;
class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      disabler: false,
      newUser: false,

      existingUser: false,
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

  render() {
    const {
      existingUser,
      customerOptions,
      selectedCustomer,
      newUser,
      disabler,
      customerOptionsCopy,
    } = this.state;

    return (
      <PaymentContext.Consumer>
        {context => (
          <>
            {console.log(context)}
            <Wrapper disabler={disabler}>
              <Box align="center">
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
                          onClick={() =>
                            this.setState({
                              disabler: true,
                              existingUser: true,
                            })
                          }
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Heading align="center" alignSelf="center" level={3}>
                  Or create new customer
                </Heading>
                <Button
                  primary
                  type="button"
                  label="Create New"
                  onClick={() =>
                    this.setState({
                      newUser: true,
                      disabler: true,
                    })
                  }
                />
              </Box>
            </Wrapper>

            <CreateTest
              users={customerOptionsCopy}
              setNewUser={context.setNewUser}
              newUser={newUser}
            />

            {existingUser && <div>Existing User</div>}
          </>
        )}
      </PaymentContext.Consumer>
    );
  }
}

export default Test;
