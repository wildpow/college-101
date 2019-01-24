import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2e8b57;
  font-family: Verdana, sans-serif;

  position: fixed;
  /* top: 0;
  left: 0; */
  bottom: 0;
  right: 0;
  z-index: 9;

  transition: transform 0.3s cubic-bezier(0.48, 0.47, 0.94, 0.94);
  overflow: hidden !important;
  &.hide {
    /* transform: translate3d(-100vw, 0, 0); */
    /* transform: translate(-100%); */
    transform: translate3d(100%, 0, 0) scale3d(1, 1, 1);
  }
  &.show {
    /* transform: translate3d(100vw, 0, 0) translateX(-100%); */
    /* transform: translate(50%); */
    transform: translate3d(0%, 0, 0) scale3d(1, 1, 1);
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
  margin-top: 60px;
  width: 100vw;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    width: 100%;
    line-height: 1.4em;
    list-style: none;
  }
  ul li {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    width: 100%;
    transition: all 0.3s;
  }
  ul li a {
    /* width: 100vw; */
    color: floralwhite;
    transition: all 0.3s;
    margin: auto;

    text-decoration: none;
  }
  ul li:hover {
    background-color: #3bb16f;
    cursor: pointer;
  }
  ul li a:active {
    color: black;
  }
`;
const MobileNav = props => {
  let visibility = "hide";
  if (props.activeButton) {
    visibility = "show";
  }
  return (
    <Wrapper className={visibility}>
      <Content>
        <ul>
          <li>
            <Link to="/schedule">Schedule</Link>
          </li>
          <li>
            <Link to="/payment">Payment</Link>
          </li>
        </ul>
      </Content>
    </Wrapper>
  );
};

export default MobileNav;
