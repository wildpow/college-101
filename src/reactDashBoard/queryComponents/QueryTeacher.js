import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Box } from "grommet";
import Spinner from "../Global_components/spinner";

export const TEACHER = gql`
  query findTeacher($userName: String!) {
    teacher(where: { userName: $userName }) {
      userName
      firstName
      lastName
      sessions(orderBy: startTime_ASC) {
        id
        extraTime
        startTime
        endTime
        maxSizeOfClass
        enrolled
        timeAndPrice {
          id
          groupVsPrivate
          name
          time
          price
          maxStudents
        }
        attendance {
          createdAt
          createdByUser {
            userName
            firstName
            lastName
            id
          }
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
  }
`;

const QueryTeacher = props => {
  const { userName } = props;
  return (
    <Query query={TEACHER} variables={{ userName }}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <Box animation="fadeOut">
              <Spinner />
            </Box>
          );
        if (error) return <h1>Error</h1>;
        if (data) return <props.component data={data} />;
        return null;
      }}
    </Query>
  );
};

QueryTeacher.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default QueryTeacher;
