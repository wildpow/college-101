import React from "react";
import PropTypes from "prop-types";
// import Helmet from 'react-helmet'
// import { StaticQuery, graphql } from 'gatsby'

import Header from "./header";

const Layout = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
