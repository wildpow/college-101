import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../Global_components/loading";

const USER_LOGGINS = gql`
  query findUser($username: String!) {
    userloggin(where: { username: $username }) {
      username
    }
  }
`;

const QueryUserNames = props => {
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

QueryUserNames.propTypes = {
  userName: PropTypes.string.isRequired,
};
export default QueryUserNames;
