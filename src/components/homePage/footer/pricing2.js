import React from "react";
import styled from "styled-components";

// const FlexCol = styled.div`
//   display: flex;
//   flex-direction: column;
//   h3 {
//     text-align: center;
//   }
//   p {
//     text-align: center;
//   }
// `;
// const FlexRow = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   div h4 {
//     text-align: center;
//   }
//   ul li {
//     padding-bottom: 5px;
//   }
// `;
// const SmallGroup = styled.div`
//   h4 {
//     margin: 0;
//     padding: 0;
//   }
//   p {
//     text-align: center;
//     font-size: 0.7em;
//     padding: 0;
//     margin: 0;
//   }
// `;

// const PrivateTutoring = styled.div`
//   h4 {
//     margin-top: 0;
//   }
// `;
const SmHiddenItem = styled.li`
  @media (min-width: 667px) {
    display: none;
  }
  @media (min-width: 1024px) {
    display: block;
  }
`;
const SmHiddenlist = styled.ul`
  display: none;
  @media (min-width: 667px) {
    display: block;
  }
  @media (min-width: 1024px) {
    display: none;
  }
`;
const SmGroup = styled.div`
  display: flex;
  flex-direction: column;
  div {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div h4 {
    font-size: 1.2em;
    margin: 0;
    padding: 0;
  }
  div span {
    font-size: 0.7em;
    padding: 0;
    margin: 0;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.2em;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 14px 0 14px 0;
    align-self: center;
    border-bottom: 2px solid white;
    width: 100%;
    text-align: center;
    font-size: 1.3em;
  }
  p {
    text-align: center;
    font-size: 0.8em;
    margin-top: 0;
    padding-left: 7px;
    padding-right: 7px;
  }
  @media (min-width: 1024px) {
    border-bottom: 2px solid white;
    p {
      display: none;
    }
  }
`;

const List = styled.div`
  ul {
    line-height: 1.5rem;
    padding-left: 15px;
    margin-bottom: 5px;
  }
  @media (min-width: 1024px) {
    padding-left: 20px;
  }
`;
const NewList = styled(List)`
  @media (min-width: 667px) {
    display: flex;
    flex-direction: row !important;
    justify-content: space-evenly;
    align-self: auto !important;
  }
`;
const PrivateTut = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
  h4 {
    font-size: 1.2em;
    border-top: 2px solid white;
    margin: 0;
    text-align: center;
    padding-top: 10px;
  }
  div {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1024px) {
    border-bottom: 0;
    h4 {
      border-top: 0;
      padding-top: 0px;
    }
  }
`;
const LgHiddenP = styled.p`
  display: none;
  @media (min-width: 1024px) {
    display: initial !important;
    text-align: center;
    font-size: 20em;
    margin-top: 0;
    padding-left: 7px;
    padding-right: 7px;
  }
`;

const Flex = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-evenly;
  }
`;
const Span = styled.span`
  @media (min-width: 500px) {
    display: none;
  }
`;
const Pricing = () => (
  <Content>
    <h3>Tuition Pricing</h3>
    <Flex>
      <SmGroup>
        <div>
          <h4>Small Group</h4>
          <span>Non AP</span>
        </div>
        <NewList>
          <ul>
            <li>One-Hour Small Group: $35</li>
            <li>90-Minute Small Group: $50</li>
            <li>Two-Hour Small Group $65</li>
            <SmHiddenItem>SAT Small Group Program $750</SmHiddenItem>
            <SmHiddenItem>ACT Small Group Program $400</SmHiddenItem>
            <SmHiddenItem>ACT/SAT Combo. $900</SmHiddenItem>
            <SmHiddenItem>PSAT Workshop $150*</SmHiddenItem>
          </ul>
          <SmHiddenlist>
            <li>SAT Small Group Program $750</li>
            <li>ACT Small Group Program $400</li>
            <li>ACT/SAT Combo. $900</li>
            <li>PSAT Workshop $150*</li>
          </SmHiddenlist>
        </NewList>
      </SmGroup>
      <p>
        *Includes all materials, unlimited refresher
        <br />
        classes and unlimited practice exams Class size limited to 8 students.
      </p>
      <PrivateTut>
        <h4>Private Tutoring</h4>
        <List>
          <ul>
            <li>Subject Area $70 per hour</li>
            <li>AP $85 per hour</li>
            <li>
              SAT/ACT $85 per hour or{" "}
              <Span>
                <br />
              </Span>
              $110/90-min.
            </li>
          </ul>
        </List>
      </PrivateTut>
    </Flex>
    <LgHiddenP>
      *Includes all materials, unlimited refresher
      <br />
      classes and unlimited practice exams Class size limited to 8 students.
    </LgHiddenP>
  </Content>
);

export default Pricing;

// @media (min-width: 1024px) {
//   div:nth-child(1) {
//     order: 1;
//   }
