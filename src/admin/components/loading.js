import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  /* top: 0;
  left: 0;
  right: 0;
  bottom: 0; */
  /* margin: auto; */
  border-top: 2px solid rgba(46, 139, 87, 0.5);
  border-right: 2px solid rgba(46, 139, 87, 0.5);
  border-bottom: 2px solid rgba(46, 139, 87, 0.5);
  border-left: 4px solid rgba(46, 139, 87, 0.5);

  background: transparent;

  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export default Spinner;
