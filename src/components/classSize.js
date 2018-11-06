import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const getClassSize = gql`
  {
    datesAndClassSize(where: { id: "cjo0zm0im5z4b0914cv4fib5u" }) {
      id
      classSize
      availableSpace
    }
  }
`;

const ClassSize = props => {
  const { displayVar, available } = props;
  return (
    <React.Fragment>
      <Query query={getClassSize}>
        {({ loading, error, data }) => {
          // const ava;
          if (loading) return <div>{displayVar}</div>;
          if (error) return <div>{displayVar}</div>;
          if (data) {
            if (available) {
              if (data.datesAndClassSize.availableSpace === null) {
                return <div>0</div>;
              }
              return <div>{data.datesAndClassSize.availableSpace}</div>;
            }
            return <div>{data.datesAndClassSize.classSize}</div>;
          }
          return null;
        }}
      </Query>
    </React.Fragment>
  );
};

export default ClassSize;
