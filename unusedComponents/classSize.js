import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import EnrollOptions from "./enrollOptions";

const getClassSize = gql`
  query singleClass($uri: ID) {
    dateSize(where: { id: $uri }) {
      id
      enrolled
      classSize
    }
  }
`;

const ClassSize = props => {
  const { displayVar, available, id, extraVar } = props;
  return (
    <React.Fragment>
      <Query query={getClassSize} variables={{ uri: id }} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                {displayVar}
                {!available && (
                  <EnrollOptions
                    extraVar={extraVar}
                    displayVar={displayVar}
                    available
                    id={id}
                  />
                )}
              </div>
            );
          if (error)
            return (
              <div>
                {displayVar}
                {!available && (
                  <EnrollOptions
                    extraVar={extraVar}
                    displayVar={displayVar}
                    available
                    id={id}
                  />
                )}
              </div>
            );
          if (data) {
            if (available === true) {
              if (data.dateSize.enrolled === null) {
                return <div>0</div>;
              }
              return <div>{data.dateSize.enrolled}</div>;
            }
            return (
              <div>
                {data.dateSize.classSize}
                <EnrollOptions
                  extraVar={data.dateSize.enrolled}
                  displayVar={data.dateSize.classSize}
                  available
                  id={id}
                />
              </div>
            );
          }
          return null;
        }}
      </Query>
    </React.Fragment>
  );
};

export default ClassSize;
