import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
  uri: process.env.GATSBY_GRAPHCMS,
  fetchOptions: {
    credentials: "include",
  },
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GATSBY_APOLLO_AUTH}`,
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
    }
    if (networkError) {
      console.log(networkError);
    }
  },
});
