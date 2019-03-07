import styled from "styled-components";
import { Text, Box } from "grommet";

export const ErrorText = styled(Text)`
  height: 24px;
`;

export const HoverContainer = styled(Box)`
  div div button div div svg {
    transition: all 250ms ease-in-out;
    :hover {
      stroke: black;
    }
  }
  div div button {
    transition: all 250ms ease-in-out;
    border: 1px solid transparent;
    :hover {
      border: 1px solid #6aac5c;
    }
  }
`;
