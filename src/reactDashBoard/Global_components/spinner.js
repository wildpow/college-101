import React from "react";
import styled, { keyframes } from "styled-components";

const Animate = keyframes`
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
`;

const Spinner = styled.div`
  background: transparent;
  justify-self: center;
  align-content: center;
  align-items: center;
  color: #01a982;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5000;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  /* padding-top: 25%; */
`;

const Base = styled.div`
  margin-right: 16px;
  background-color: #01a982;
  height: 500px;

  width: 25px;
  display: inline-block;
  -webkit-animation: ${Animate} 1.2s infinite ease-in-out;
  animation: ${Animate} 1.2s infinite ease-in-out;
`;
const Rect2 = styled(Base)`
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
`;
const Rect3 = styled(Base)`
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`;
const Rect4 = styled(Base)`
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
`;
const Rect5 = styled(Base)`
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
`;

export default () => (
  <Spinner>
    <Base />
    <Rect2 />
    <Rect3 />
    <Rect4 />
    <Rect5 />
  </Spinner>
);
