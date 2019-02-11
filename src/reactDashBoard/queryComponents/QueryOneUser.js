import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../components/loading";

const ONEUSER = gql`
  query OneUser($username: String!) {
    userloggin(where: { username: $username }) {
      username
      id
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

const QueryOneUser = props => {
  const { userName } = props;
  return (
    <>
      <Query query={ONEUSER} variables={{ username: userName }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner />;
          if (error) return <h1>Error</h1>;
          if (data) return <props.component data={data} {...props} />;
          return null;
        }}
      </Query>
    </>
  );
};
export default QueryOneUser;
