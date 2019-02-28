import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import styled from "styled-components";
// import ClassSize from "./classSize";
// import Enroll from "../enroll";
import { timeFormat, enrolledNullCheck } from "../../utils/globalFunctions";

const Td = styled.td`
  text-align: center !important;
`;

const getFreshSession = gql`
  query singleClass($uri: ID) {
    session(where: { id: $uri }) {
      id
      enrolled
      maxSizeOfClass
    }
  }
`;

const SingleClass = props => {
  const { startTime, endTime, enrolled, id, maxSizeOfClass } = props.today;
  return (
    <>
      <tr>
        <td>{props.today.course.name}</td>
        <td>{timeFormat(startTime)}</td>
        <td>{timeFormat(endTime)}</td>

        <Query query={getFreshSession} variables={{ uri: id }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <>
                  <td>
                    {`${enrolledNullCheck(enrolled)} / ${maxSizeOfClass}`}
                  </td>
                  <td>
                    {enrolled === maxSizeOfClass ? <>FULL</> : <>enroll</>}
                  </td>
                </>
              );
            if (error)
              return (
                <>
                  <td>
                    {`${enrolledNullCheck(enrolled)} / ${maxSizeOfClass}`}
                  </td>
                  <td>
                    {enrolled === maxSizeOfClass ? (
                      <>FULL</>
                    ) : (
                      {
                        /* <Enroll enrolled={enrolled} id={id} /> */
                      }
                    )}
                  </td>
                </>
              );
            if (data)
              return (
                <>
                  <Td>
                    {`${enrolledNullCheck(data.session.enrolled)} / ${
                      data.session.maxSizeOfClass
                    }`}
                  </Td>
                  <td>
                    {data.session.enrolled === data.session.maxSizeOfClass ? (
                      <>FULL</>
                    ) : (
                      <>enroll</>
                      /* <Enroll enrolled={data.session.enrolled} id={id} /> */
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

/* <Enroll enrolled={enrolled} id={id} /> */
