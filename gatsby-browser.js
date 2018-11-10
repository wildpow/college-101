/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import React from "react";

const { GATSBY_GRAPHCMS } = process.env;

const client = new ApolloClient({
  uri: GATSBY_GRAPHCMS,
});
console.log(process.env);
export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>;
};
// stuff
