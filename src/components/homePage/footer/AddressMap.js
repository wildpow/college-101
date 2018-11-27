import React from "react";
import styled from "styled-components";
import GoogleMapContainer from "./map";

const Wrapper = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
  justify-content: space-evenly;
`;
const Map = styled.div`
  display: none;
  margin-right: 20px;
  @media (min-width: 768px) {
    display: block;
  }
`;
const Address = styled.address`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  a {
    text-align: center;
  }
`;
const AddressMap = () => (
  <Wrapper>
    <Map>
      <GoogleMapContainer />
    </Map>

    <Address>
      <h3>Address</h3>
      College 101
      <br />
      <a
        href="https://goo.gl/maps/z3oRiJWRWsw"
        target="_blank"
        rel="noopener noreferrer"
      >
        290 Main Street East Setauket NY 11733
      </a>
      <br />
      Phone:
      <a href="tel:1-631-364-9080">(631) 364-9080</a>
      <br />
      E-mail:
      <a href="mailto:college101resourcecenter@gmail.com">
        College101ResourceCenter@Gmail.com
      </a>
    </Address>
  </Wrapper>
);

export default AddressMap;
