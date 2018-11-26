import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Button = styled.div`
  display: flex;
  justify-content: center;
  a {
    padding: 0.5em 3em;
    border: 0.16em solid #ffffff;
    margin: 0.4em auto;
    text-decoration: none;
    text-transform: uppercase;
    font-family: Verdana, sans-serif;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    transition: all 0.15s;
    background: transparent;
    outline: none;
    cursor: pointer;
    &:hover {
      color: #dddddd;
      border-color: #dddddd;
    }
    &:active {
      color: #bbbbbb;
      border-color: #bbbbbb;
    }
  }
`;

const LinkButton = () => (
  <Button>
    <Link to="/schedule">view schedule</Link>
  </Button>
);

export default LinkButton;
