import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
  justify-content: space-evenly;
`;
const Map = styled.div`
  width: 250px;
  display: none;
  height: 250px;
  color: black;
  margin-right: 20px;
  background-color: white;
  @media (min-width: 768px) {
    display: block;
  }
`;
const AddressMap = () => (
  <Wrapper>
    <Map>MAP</Map>
    <div>
      <h3>Address</h3>
      College 101
      <br />
      290 Main Street East Setauket NY 11733
      <br />
      Phone: (631) 364-9080
      <br />
      E-mail: College101ResourceCenter@Gmail.com
    </div>
  </Wrapper>
);

export default AddressMap;
