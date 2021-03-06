import React from "react";
import styled from "styled-components";

const SubjectWrapper = styled.div`
  h3 {
    margin-top: ${props => (props.top ? "1em" : "1px")};
    text-align: center;
    text-decoration: underline;
    margin-bottom: 0;
    letter-spacing: 0.1em;
    font-size: 1.25em;
  }
  @media (min-width: 321px) {
    h3 {
      margin-top: ${props => (props.top ? "1em" : "1em")};
    }
  }
  ul {
    list-style: none;
    margin-top: 7px;
    padding: 2px 10px 2px 10px;
  }
  ul li {
    padding-bottom: 4px;
    text-align: center;
    font-size: 1.2em;
  }
`;

export const Historys = () => (
  <SubjectWrapper>
    <h3>History</h3>
    <ul>
      <li>World History</li>
      <li>U.S. History</li>
      <li>AP</li>
    </ul>
  </SubjectWrapper>
);

export const English = () => (
  <SubjectWrapper>
    <h3>English</h3>
    <ul>
      <li>Essay Writing</li>
    </ul>
  </SubjectWrapper>
);

export const Science = () => (
  <SubjectWrapper>
    <h3>Science</h3>
    <ul>
      <li>Earth Science</li>
      <li>Living Environment</li>
      <li>Chemistry</li>
      <li>Physics</li>
      <li>AP</li>
    </ul>
  </SubjectWrapper>
);

export const Maths = () => (
  <SubjectWrapper top>
    <h3>Math</h3>
    <ul>
      <li>Algebra</li>
      <li>Geometry</li>
      <li>Algebra 2 Trig</li>
      <li>Calculus</li>
      <li>Statistics</li>
      <li>AP</li>
      <li>6-8th Grade</li>
      <li>Honors</li>
    </ul>
  </SubjectWrapper>
);
