import React from "react";
import styled from "styled-components";

const AwardWrapper = styled.div`
  max-width: 380px;
  line-height: 1.5rem;
  /* text-align: center; */
  margin: 0 auto;
  p {
    margin-bottom: 0;
    font-size: 1.2em;
  }
  @media (min-width: 768px) {
    max-width: 470px;
  }
`;

const AwardText = () => (
  <>
    <h2>Awards</h2>
    <AwardWrapper>
      <p>
        College 101 is celebrating it&apos;s Sweet 16! We have been lucky to
        work with more than 1500 students during our 16 years in 3 Village!
      </p>
      <p>
        College 101 has been nominated as one of Long Island&apos;s Best
        Tutoring centers 3 times!
      </p>
    </AwardWrapper>
  </>
);

export default AwardText;
