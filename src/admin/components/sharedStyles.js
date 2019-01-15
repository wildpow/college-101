import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.5em 3em;
  border: 0.16em solid green;
  margin-top: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Verdana, sans-serif;
  font-weight: 400;
  color: black;
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
`;

export const ErrorWrapper = styled.div`
  height: 20px;
  font-family: Verdana, sans-serif;
  color: red;
  text-align: center;
  line-height: 1.4em;
  margin-bottom: 10px;
  margin-top: 10px;
`;
