import styled from "styled-components";

export const Main = styled.div`
  position: relative;
  margin: 0 auto;
  font-family: Verdana, sans-serif;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: Verdana, sans-serif;
  margin-top: 5px;
  margin-bottom: 10px;
  @media (min-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  div h2 {
    background-color: green;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.2em;
    margin-top: 0;
    margin-bottom: 0;
    padding: 14px;
    text-align: center;
    font-size: 1.2rem;
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
  margin-bottom: 10px;
`;
