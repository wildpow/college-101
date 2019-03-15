import styled from "styled-components";
import { Box } from "grommet";

const ScrollBox = styled(Box)`
  overflow-y: scroll !important;
  overflow: scroll;
  max-height: 400px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.33);
  border-right: solid 1px rgba(0, 0, 0, 0.33);
  border-left: solid 1px rgba(0, 0, 0, 0.33);
`;

export default ScrollBox;
