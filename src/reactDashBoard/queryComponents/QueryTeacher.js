import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../Global_components/loading";

const TEACHER = gql`
  query findTeacher($userName: String!) {
    teacher(where: { userName: $userName }) {
      userName
      firstName
      lastName
      sessions {
        course {
          name
          id
        }
        id
        attendance {
          notes
          status
          extraStudents
          students {
            firstName
            lastName
            id
          }
          id
          status
        }
        status
        startTime
        endTime
        enrolled
        maxSizeOfClass
        students {
          id
          firstName
          lastName
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
        if (loading) return <Spinner />;
        if (error) return <h1>Error</h1>;
        if (data) return <props.component data={data} {...props} />;
        return null;
      }}
    </Query>
  );
};

QueryTeacher.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default QueryTeacher;
