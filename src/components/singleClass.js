import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import ClassSize from "./classSize";
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

const timeFormat = time => {
  const timeObject = new Date(time);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const timeString = timeObject.toLocaleString("en-US", options);
  return timeString;
};

const enrolledNullCheck = enrolled => {
  if (enrolled === null) return 0;
  return enrolled;
};

const SingleClass = props => {
  const { startDate, endDate, enrolled, id, classSize } = props.today;
  return (
    <>
      <tbody>
        <tr>
          <td>{props.today.class.name}</td>
          <td>{timeFormat(startDate)}</td>
          <td>{timeFormat(endDate)}</td>

          <Query
            query={getClassSize}
            variables={{ uri: id }}
            pollInterval={500}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <>
                    <td>
                      {`${enrolledNullCheck(enrolled)}
                      /
                      ${classSize}`}
                    </td>
                    <td>
                      {enrolled === classSize ? (
                        <>FULL</>
                      ) : (
                        <EnrollOptions enrolled={enrolled} id={id} />
                      )}
                    </td>
                  </>
                );
              if (error)
                return (
                  <>
                    <td>{`${enrolledNullCheck(enrolled)}/${classSize}`}</td>
                    <td>
                      {enrolled === classSize ? (
                        <>FULL</>
                      ) : (
                        <EnrollOptions enrolled={enrolled} id={id} />
                      )}
                    </td>
                  </>
                );
              if (data)
                return (
                  <>
                    <td>
                      {`${enrolledNullCheck(data.dateSize.enrolled)}/
                    ${data.dateSize.classSize}`}
                    </td>
                    <td>
                      {data.dateSize.enrolled === data.dateSize.classSize ? (
                        <>FULL</>
                      ) : (
                        <EnrollOptions
                          enrolled={data.dateSize.enrolled}
                          id={id}
                        />
                      )}
                    </td>
                  </>
                );
              return null;
            }}
          </Query>
        </tr>
      </tbody>
    </>
  );
};

export default SingleClass;
