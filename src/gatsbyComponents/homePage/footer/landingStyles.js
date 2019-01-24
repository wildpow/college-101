import styled from "styled-components";

export const MapInfo = styled.div`
  color: #706259;
  display: flex;
  flex-direction: column;
  font-variant: small-caps;
  font-family: Arial, Helvetica, sans-serif;
  & h3 {
    margin-bottom: 1px;
    margin-top: 2px;
    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
    @media (min-width: 1024px) {
      font-size: 1.8rem;
    }
  }
  & a {
    color: #706259;
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 1rem;
    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
    @media (min-width: 1024px) {
      font-size: 1.6rem;
      letter-spacing: 0.2rem;
    }
    &:hover {
      color: red !important;
    }
  }
`;
