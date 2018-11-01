import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const NavWrapper = styled.div`
  overflow: hidden;
  background-color: #333;
  font-family: Arial, Helvetica, sans-serif;
  & a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  & a:hover {
    background-color: #ddd;
    color: black;
  }
  & a:active {
    background-color: #4caf50;
    color: white;
  }
`;

const Navbar = () => (
  <NavWrapper>
    <Link
      to="/"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      Home
    </Link>
    <Link
      to="/about"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      About
    </Link>
    <Link
      to="/links"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      Helpful Links
    </Link>
    <Link
      to="/pricing"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      Tuition Pricing
    </Link>
    <Link
      to="/sat-act"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      SAT/ACT
    </Link>
    <Link
      to="/register"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      register
    </Link>
    <Link
      to="/payment"
      activeStyle={{
        backgroundColor: "#4caf50",
        color: "white",
      }}
    >
      payment
    </Link>
  </NavWrapper>
);

export default Navbar;
