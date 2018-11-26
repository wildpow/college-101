import React from "react";
import styled from "styled-components";
import { Maths, Science, English, Historys } from "./subjects";

const ActFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0px 10px 0px 10px;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

const Tutoring = () => (
  <>
    <h2>Academic Tutoring</h2>
    <ActFlex>
      <div>
        <Maths />
        <English />
      </div>
      <div>
        <Science />
        <Historys />
      </div>
    </ActFlex>
  </>
);

export default Tutoring;
