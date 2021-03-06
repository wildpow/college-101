import styled, { keyframes } from "styled-components";

// Not sure I want to key this animation just tring it out
const Animation = `animation-duration: .5s; animation-fill-mode: both;`;
const FadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Main = styled.div`
  animation-name: ${FadeIn};
  ${Animation}
  position: relative;
  margin: 0 auto;
  font-family: Verdana, sans-serif;
  color: floralwhite;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: Verdana, sans-serif;
  margin-top: 5px;
  margin-bottom: 10px;
  @media (min-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
    div:nth-child(1) {
      order: 1;
      flex-basis: 48%;
    }
    div:nth-child(2) {
      order: 3;
      flex-basis: 48%;
    }
    div:nth-child(3) {
      order: 4;
      flex-basis: 48%;
    }
    div:nth-child(4) {
      order: 2;
      flex-basis: 48%;
    }
  }
  @media (min-width: 1500px) {
    flex-wrap: nowrap;
    margin-top: 15px;
    div:nth-child(1) {
      order: 1;
      flex-basis: 32%;
    }
    div:nth-child(2) {
      order: 2;
      flex-basis: 32%;
    }
    div:nth-child(4) {
      order: 3;
      flex-basis: 32%;
    }
    /* div:nth-child(4) {
      flex-basis: 0%;
    } */
  }
  div h2 {
    background-color: #2e8b57;
    color: floralwhite;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.2em;
    margin-top: 0;
    margin-bottom: 0;
    padding: 14px 0 14px 0;
    text-align: center;
    font-size: 1.3rem;
    @media (min-width: 1300px) {
      font-size: 1.5rem;
    }
    @media (min-width: 1500px) {
      font-size: 1.8rem;
    }
  }
`;

export const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  flex-basis: 30%;
  background-color: white;
  margin-bottom: 10px;
  @media (min-width: 1500px) {
    display: ${props => (props.show1024 ? "none" : "block")};
  }
`;
