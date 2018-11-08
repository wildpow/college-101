import styled from "styled-components";
import Calendar from "react-calendar";

export const CalContent = styled.div`
  display: flex;
  max-width: 100%;
  flex-basis: 420px;
  flex-direction: column;
  flex-grow: 100;
  align-items: stretch;
  padding-top: 1em;
  font-family: Montserrat, "Segoe UI", Tahoma, sans-serif;
`;

export const CalContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 10px 0;
  padding: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  margin: 10px 0;
  padding: 10px;
`;

export const CalStyled = styled(Calendar)`
  box-shadow: 0 30px 40px 0 rgba(16, 36, 94, 0.2);
  border-radius: 4px;
  font-family: inherit;
  /* width: 450px !important; */
`;
