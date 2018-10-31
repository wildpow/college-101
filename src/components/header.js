import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import logo from "../images/logo.png";

const Navbar = styled.div`
  /* width: 100vh; */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  background: ${props => (props.bgColor ? "green" : "red")};
  & a {
    color: white;
  }
`;

const NewLink = styled(Link)`
  font-size: 20px;
`;

const Header = () => (
  <div>
    <img src={logo} alt="its a" />
    <Navbar>
      <NewLink to="/">Home</NewLink>
      <Link to="/about">Go to about page</Link>
      <Link to="/homework-help">Go to page homework help</Link>
    </Navbar>
    <Navbar bgColor>
      <Link to="/">Home</Link>
      <Link to="/about">Go to about page</Link>
      <Link to="/homework-help">Go to page homework help</Link>
    </Navbar>
  </div>
);

export default Header;
