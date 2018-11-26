import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

const { GATSBY_GRAPHCMS } = process.env;

export const client = new ApolloClient({
  uri: GATSBY_GRAPHCMS,
  fetch,
});
