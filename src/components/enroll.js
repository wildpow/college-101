import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

class Enroll extends React.Component {
  constructor(props) {
    super(props);
    this.handleCount = this.handleCount.bind(this);
  }

  handleCount() {
    const { enrolled, id, mutate } = this.props;
    const newCount = enrolled + 1;
    console.log("newCount", newCount);
    console.log("old Count", enrolled);
    mutate({
      variables: { uri: id, newCount },
    })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("error when sending the query", error);
      });
  }

  render() {
    return (
      <button type="button" onClick={() => this.handleCount()}>
        enroll
      </button>
    );
  }
}

const submitChanges = gql`
  mutation updateDatesAndClassSize($newCount: Int, $uri: ID) {
    updateDateSize(where: { id: $uri }, data: { enrolled: $newCount }) {
      enrolled
    }
  }
`;

export default graphql(submitChanges)(Enroll);
