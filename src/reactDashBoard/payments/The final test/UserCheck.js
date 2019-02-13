import React from "react";
import styled from "styled-components";
import { Select, Button, Box, Heading } from "grommet";
import { PaymentContext } from "./context";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

const UserCheck = () => {
  return (
    <PaymentContext.Consumer>
      {context => (
        <Wrapper>
          {/* {console.log("sefwefwef", context)} */}
          <Box align="center">
            <Heading level={3}>check if customer exists</Heading>
            <Box direction="column" gap="xsmall">
              <Select
                searchPlaceholder="Search Customers"
                placeholder="Select a Customer"
                options={context.state.userNames}
                value={context.state.selectedUser}
                onSearch={searchText => context.onSearchCustomer(searchText)}
                onChange={event => context.customerSelectChange(event)}
              />
              <Box height="50px">
                {context.state.selectedUser.length === 0 ? null : (
                  <Box animation="zoomIn">
                    <Button
                      type="button"
                      label="Confirm"
                      onClick={() =>
                        context.confirmExistingUser(context.state.selectedUser)
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
              onClick={context.newUserButton}
            />
          </Box>
        </Wrapper>
      )}
    </PaymentContext.Consumer>
  );
};

export default UserCheck;
