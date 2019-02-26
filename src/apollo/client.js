import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
  uri: process.env.GATSBY_GRAPHCMS,
  fetchOptions: {
    credentials: "include",
    // mode: "no-cors",
  },
  request: async operation => {
    operation.setContext({
      headers: {
        mode: `Access-Control-Allow-Origin`,
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
  fetch,
});
