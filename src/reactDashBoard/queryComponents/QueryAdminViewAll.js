import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../Global_components/loading";

export const ALL_FOR_ADMIN = gql`
  query all_for_admin {
    teachers(where: { teachersStatus: Active }, orderBy: firstName_ASC) {
      firstName
      lastName
      id
      userName
    }
    privateTutorings {
      id
      maxSizeOfClass
      name
      time
      pricePerHour
    }
    courses {
      name
      id
      apNonAp
    }
    timeAndPrices {
      id
      name
      time
      price
      maxStudents
    }
    sessions(orderBy: startTime_ASC) {
      id
      privateTutoring {
        id
        name
      }
      startTime
      endTime
      maxSizeOfClass
      enrolled
      timeAndPrice {
        id

        name
        time
        price
        maxStudents
      }
      attendance {
        status
        id
        extraStudents
        notes
        students {
          firstName
          lastName
        }
      }

      receipts {
        student {
          firstName
          lastName
          id
          receipts {
            id
          }
          attendance {
            id
          }
        }
        id
        email
      }
      course {
        name
        id
      }
      teacher {
        firstName
        lastName
        id
      }

      students {
        firstName
        lastName
        id
        receipts {
          id
        }
        attendance {
          id
        }
      }
    }
  }
`;

const QueryAdminViewAll = props => (
  <Query query={ALL_FOR_ADMIN}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return <h1>Error</h1>;
      if (data) return <props.component data={data} {...props} />;
      return null;
    }}
  </Query>
);

export default QueryAdminViewAll;
