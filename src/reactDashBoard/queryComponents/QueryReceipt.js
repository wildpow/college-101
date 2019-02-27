import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../Global_components/loading";

const ONERECEIPT = gql`
  query SingleReceipt($receiptID: ID!) {
    receipt(where: { id: $receiptID }) {
      name
      email
      createdAt
      paymentMethod
      createdbyuser
      student {
        firstName
        lastName
        id
      }
      userloggin {
        firstName
        lastName
        username
        mailingAddress
      }
    }
  }
`;

const QueryReceipt = ({ receiptID, component: Component }) => {
  return (
    <Query query={ONERECEIPT} variables={{ receiptID }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return <h1>Error</h1>;
        if (data) return <Component data={data} />;
        return null;
      }}
    </Query>
  );
};

export default QueryReceipt;
