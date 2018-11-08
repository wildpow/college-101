import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";
// import ClassSize from "./classSize";
import Enroll from "./enroll";

const Td = styled.td`
  text-align: center !important;
`;

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
      <tr>
        <td>{props.today.class.name}</td>
        <td>{timeFormat(startDate)}</td>
        <td>{timeFormat(endDate)}</td>

        <Query query={getClassSize} variables={{ uri: id }} pollInterval={500}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <td>{`${enrolledNullCheck(enrolled)} / ${classSize}`}</td>
                  <td>
                    {enrolled === classSize ? (
                      <>FULL</>
                    ) : (
                      <Enroll enrolled={enrolled} id={id} />
                    )}
                  </td>
                </>
              );
            if (error)
              return (
                <>
                  <td>{`${enrolledNullCheck(enrolled)} / ${classSize}`}</td>
                  <td>
                    {enrolled === classSize ? (
                      <>FULL</>
                    ) : (
                      <Enroll enrolled={enrolled} id={id} />
                    )}
                  </td>
                </>
              );
            if (data)
              return (
                <>
                  <Td>
                    {`${enrolledNullCheck(data.dateSize.enrolled)} / ${
                      data.dateSize.classSize
                    }`}
                  </Td>
                  <td>
                    {data.dateSize.enrolled === data.dateSize.classSize ? (
                      <>FULL</>
                    ) : (
                      <Enroll enrolled={data.dateSize.enrolled} id={id} />
                    )}
                  </td>
                </>
              );
            return null;
          }}
        </Query>
      </tr>
    </>
  );
};

export default SingleClass;
