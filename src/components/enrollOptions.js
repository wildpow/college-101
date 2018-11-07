import React from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

class EnrollOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleCount = this.handleCount.bind(this);
  }

  handleCount() {
    const { available, displayVar, extraVar, id, mutate } = this.props;
    let newCount;
    if (available) {
      newCount = displayVar + 1;
    }
    newCount = extraVar + 1;
    console.log("newCount", newCount);
    console.log("old Count", displayVar, extraVar);
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
    const { displayVar, extraVar } = this.props;
    if (displayVar === extraVar) {
      return <>CLASS IS FULL</>;
    }
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

export default graphql(submitChanges)(EnrollOptions);
