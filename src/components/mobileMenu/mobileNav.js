import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;
  position: fixed;
  /* top: 0;
  left: 0; */
  bottom: 0;
  right: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s cubic-bezier(0.48, 0.47, 0.94, 0.94);
  overflow: hidden !important;
  &.hide {
    transform: translate3d(-100vw, 0, 0);
  }
  &.show {
    transform: translate3d(100vw, 0, 0) translateX(-100%);
  }
`;
const MobileNav = props => {
  let visibility = "hide";
  if (props.activeButton) {
    visibility = "show";
  }
  return (
    <Wrapper className={visibility}>
      <h1>hello</h1>
    </Wrapper>
  );
};

export default MobileNav;
