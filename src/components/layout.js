import React from "react";
import PropTypes from "prop-types";
import { Normalize } from "styled-normalize";
import NavBar from "./navbar";

const Layout = ({ children }) => (
  <>
    <NavBar />
    <Normalize /> {/* CSS reset  */}
    <div>{children}</div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
