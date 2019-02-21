import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../components/loading";

const ALL_USERS = gql`
  query userCheck {
    userloggins {
      username
      status
      firstName
      lastName
      mailingAddress
      students {
        firstName
        lastName
        id
      }
      receipts {
        id
        email
        name
        paymentMethod
        mailingAddress
        createdAt
        sessions {
          id
          startTime
          endTime
          course {
            name
          }
          sessionPackage {
            numberOfSessions
          }
          maxSizeOfClass
        }
      }
    }
  }
`;

const QueryAllUsers = props => (
  <Query query={ALL_USERS}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <h1>Error</h1>;
      if (data) return <props.component data={data} {...props} />;
      return null;
    }}
  </Query>
);

export default QueryAllUsers;
