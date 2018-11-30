import React from "react";
import styled from "styled-components";
import GoogleMapContainer from "./map";

const Wrapper = styled.div`
  margin-top: 15px;
  /* padding-bottom: 15px; */
  display: flex;
  background-color: green;
  /* padding-top: 20px; */
  justify-content: center;
  justify-content: space-evenly;
  @media (min-width: 1220px) {
    margin-top: 0px;
    flex-basis: 48%;
  }
`;
const Map = styled.div`
  display: none;
  /* margin-right: 20px; */
  @media (min-width: 768px) {
    display: block;
  }
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  /* align-items: center; */
  margin-bottom: 20px;
  @media (min-width: 1220px) {
    margin-bottom: 0px;
    /* flex-basis: 50%; */
  }
  a {
    text-align: center;
  }
  h3 {
    background-color: green;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.2em;
    margin-top: 0;
    margin-bottom: 10px;
    padding: 10px 0 10px 0;
    text-align: center;
    font-size: 1.7rem;
    border-bottom: 2px solid white;
    width: 100%;

    @media (min-width: 1300px) {
      font-size: 1.6rem;
    }
    @media (min-width: 1500px) {
      font-size: 1.8rem;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.2rem;
  }
  div h5 {
    font-size: 1.1em;
    /* border-top: 2px solid white; */
    margin: 0;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 4px;
  }
`;
const AddressMap = () => (
  <Wrapper>
    <Map>
      <GoogleMapContainer />
    </Map>

    <Address>
      <h3>Contact</h3>
      <div>
        <h5>College 101</h5>
        <a
          href="https://goo.gl/maps/z3oRiJWRWsw"
          target="_blank"
          rel="noopener noreferrer"
        >
          290 Main Street East
          <br />
          Setauket NY 11733
        </a>
      </div>
      <div>
        <h5>Phone:</h5>
        <a href="tel:1-631-364-9080">(631) 364-9080</a>
      </div>
      <div>
        <h5>E-mail:</h5>
        <a href="mailto:college101resourcecenter@gmail.com">
          College101ResourceCenter
          <br />
          @Gmail.com
        </a>
      </div>
    </Address>
  </Wrapper>
);

export default AddressMap;
