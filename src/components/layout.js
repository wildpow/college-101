import React from "react";
import PropTypes from "prop-types";
import { Normalize } from "styled-normalize";
import styled from "styled-components";
import NavBar from "./navbar";

const Wrapper = styled.div`
  padding-top: 50px;
`;
const Layout = ({ children }) => (
  <>
    <NavBar />
    <Normalize /> {/* CSS reset  */}
    <Wrapper>{children}</Wrapper>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
