import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const NavWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 0;
  overflow: hidden;
  color: #000;
  background-color: #fff;
  letter-spacing: 4px;
  padding: 8px 16px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  & a {
    padding: 8px 16px;
    float: left;
    width: auto;
    border: none;
    display: block;
    outline: 0;
    white-space: normal;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    /* vertical-align: middle; */
    text-align: center;
    font-family: Verdana, sans-serif;
  }
  /* overflow: hidden;
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
  } */
  & div {
    float: right;
  }
`;
const NavRight = styled.div`
  text-align: right;
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
      College101Prep
    </Link>
    <NavRight>
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
      <Link
        to="/schedule"
        activeStyle={{
          backgroundColor: "#4caf50",
          color: "white",
        }}
      >
        schedule
      </Link>
    </NavRight>
  </NavWrapper>
);

export default Navbar;
