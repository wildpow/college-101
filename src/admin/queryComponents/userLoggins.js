import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../components/loading";

const USER_LOGGINS = gql`
  query findUser($username: String!) {
    userloggin(where: { username: $username }) {
      username
    }
  }
`;

const UserLoggins = props => {
  const { userName } = props;
  return (
    <>
      <Query query={USER_LOGGINS} variables={{ username: userName }}>
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

export default UserLoggins;
