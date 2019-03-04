import React from "react";
import styled from "styled-components";
import { FormField, RangeInput, Box, Heading } from "grommet";

const MaxStudentWrapper = styled(Box)`
  div {
    border-bottom: 0px solid black !important;
    border: none !important;
    margin-bottom: 0; // PPPP
  }
  h1 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  div div {
    margin-bottom: 6px;
  }
`;

const MaxStudents = props => {
  const { maxSizeOfClass, onMaxChange } = props;
  return (
    <MaxStudentWrapper>
      <FormField name="max" label="Max Number of student in this session?">
        <RangeInput
          onChange={onMaxChange}
          min={1}
          max={25}
          value={maxSizeOfClass}
        />
        <Box direction="row" align="center" alignSelf="center">
          <Heading level={1}>{maxSizeOfClass}</Heading>
        </Box>
      </FormField>
    </MaxStudentWrapper>
  );
};

export default MaxStudents;
