import styled from "styled-components";
import { Box } from "grommet";

export const TitleWrapper = styled(Box)`
  button {
    /* padding-bottom: 0px;
    padding-top: 0px; */
    padding: 0;
  }
  h2 {
    align-self: center;
  }
  button svg:hover {
    transition: all 250ms ease-in-out;
    stroke: black;
    fill: black;
  }
`;
