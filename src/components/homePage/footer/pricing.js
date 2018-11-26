import React from "react";
import styled from "styled-components";

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
  }
`;
const FlexRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  div h4 {
    text-align: center;
  }
  ul li {
    padding-bottom: 5px;
  }
`;
const SmallGroup = styled.div`
  h4 {
    margin: 0;
    padding: 0;
  }
  p {
    text-align: center;
    font-size: 0.7em;
    padding: 0;
    margin: 0;
  }
`;

const PrivateTutoring = styled.div`
  h4 {
    margin-top: 0;
  }
`;

const Pricing = () => (
  <FlexCol>
    <h3>Tuition Pricing</h3>
    <FlexRow>
      <div>
        <SmallGroup>
          <h4>Small Group</h4>
          <p>Non AP</p>
        </SmallGroup>
        <ul>
          <li>One-Hour Small Group: $35</li>
          <li>90-Minute Small Group: $50</li>
          <li>Two-Hour Small Group $65</li>
          <li>SAT Small Group Program $750</li>
          <li>ACT Small Group Program $400</li>
          <li>ACT/SAT Combo. $900</li>
          <li>PSAT Workshop $150*</li>
        </ul>
      </div>
      <PrivateTutoring>
        <h4>Private Tutoring</h4>
        <ul>
          <li>Subject Area $70 per hour</li>
          <li>AP $85 per hour</li>
          <li>SAT/ACT $85 per hour or$110/90-min.</li>
        </ul>
      </PrivateTutoring>
    </FlexRow>
    <p>
      *Includes all materials, unlimited refresher
      <br />
      classes and unlimited practice exams Class size limited to 8 students.
    </p>
  </FlexCol>
);

export default Pricing;
