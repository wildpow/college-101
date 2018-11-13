import React from "react";
import styled from "styled-components";

const Dude = styled.button`
  width: 60px;
  height: 45px;
  position: relative;
  margin: -10px 30px -10px 0px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  outline: none;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  span {
    display: block;
    position: absolute;
    height: 9px;
    width: 100%;
    background: black;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }
  span:nth-child(1) {
    top: ${props => (props.activeButton ? "-3px" : "0px")};
    left: ${props => (props.activeButton ? "8px" : "0px")};
    transform: ${props =>
      props.activeButton ? "rotate(45deg)" : "rotate(0deg)"};
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: 18px;
    width: ${props => (props.activeButton ? "0%" : "100%")};
    opacity: ${props => (props.activeButton ? "0" : "1")};
    transform-origin: left center;
  }
  span:nth-child(3) {
    transform: ${props =>
      props.activeButton ? "rotate(-45deg)" : "rotate(0deg)"};
    top: ${props => (props.activeButton ? "39px" : "36px")};
    left: ${props => (props.activeButton ? "8px" : "0px")};
    transform-origin: left center;
  }
  @media (min-width: 1235px) {
    display: none;
  }
`;

const MobileButton = props => {
  const { activeButton, handleActiveButton } = props;
  return (
    <Dude onClick={handleActiveButton} activeButton={activeButton}>
      {console.log("props from mobileButton", props)}
      <span />
      <span />
      <span />
    </Dude>
  );
};

export default MobileButton;
