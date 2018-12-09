import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { timeFormat, enrolledNullCheck } from "../../utils/globalFunctions";

const getSessions = gql`
  query allSessions {
    sessions(orderBy: startTime_ASC) {
      id
      startTime
      endTime
      maxSizeOfClass
      enrolled
      course {
        name
      }
    }
  }
`;

const ViewSessions = () => (
  <Query query={getSessions} pollInterval={500}>
    {({ loading, error, data }) => {
      if (loading) return <h1>Loading</h1>;
      if (error) return <h1>Error</h1>;
      if (data)
        return (
          <>
            <h2>Current Schedule</h2>
            {data.sessions.map(session => (
              <ul key={session.id}>
                <li>{`Course Name: ${session.course.name}`}</li>
                <li>{`Start Time: ${timeFormat(session.startTime)}`}</li>
                <li>{`End Time: ${timeFormat(session.endTime)}`}</li>
                <li>
                  {`Enrollment: 
                  ${enrolledNullCheck(session.enrolled)}
                   / 
                   ${session.maxSizeOfClass}`}
                </li>
                <li>{``}</li>
              </ul>
            ))}
          </>
        );
    }}
  </Query>
);

export default ViewSessions;
