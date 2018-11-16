import React from "react";
import styled from "styled-components";

const TestPrepFlex = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  ul {
    list-style: none;
  }
  ul li {
    padding: 2px 15px 10px 15px;
    font-size: 1.2em;
  }
`;

const TestPrep = () => (
  <>
    <h2>Test Prepatation</h2>
    <TestPrepFlex>
      <ul>
        <li>PSAT</li>
        <li>SAT</li>
        <li>ACT</li>
      </ul>
      <ul>
        <li>GRE</li>
        <li>Subject Exams</li>
        <li>CHSEE</li>
      </ul>
    </TestPrepFlex>
  </>
);

export default TestPrep;
