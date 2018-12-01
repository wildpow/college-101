import React from "react";
import styled from "styled-components";
import GoogleMapContainer from "./map";

const Wrapper = styled.div`
  margin-top: 15px;
  /* padding-bottom: 15px; */
  display: flex;
  color: floralwhite;
  background-color: #2e8b57;
  /* padding-top: 20px; */
  justify-content: center;
  justify-content: space-evenly;
  @media (min-width: 1220px) {
    margin-top: 0px;
    flex-direction: column;
    flex-basis: 48%;
  }
  @media (min-width: 1400px) {
    flex-basis: 48.7%;
  }
`;
const Map = styled.div`
  display: none;
  /* margin-right: 20px; */
  @media (min-width: 667px) {
    display: block;
  }
  @media (min-width: 1220px) {
    padding-left: 10px;
    padding-bottom: 10px;
  }
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;

  /* align-items: center; */
  margin-bottom: 20px;
  @media (min-width: 1220px) {
    margin-bottom: 0px;
  }
  a {
    text-align: center;
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
  @media (min-width: 768px) {
    div a {
      line-height: 1.4em;
      color: black;
    }
    div a:hover {
      color: white;
    }
  }
  @media (min-width: 1024px) {
    div a {
      line-height: 1.6em;
    }
  }
`;
const MainTitle = styled.h3`
  background-color: #2e8b57;
  color: floralwhite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.2em;
  margin-top: 0;
  margin-bottom: 10px;
  padding: 10px 0 10px 0;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 2px solid white;
  width: 100%;
  display: ${props => (props.hiddenSm ? "initial" : "none")};
  @media (min-width: 1220px) {
    display: ${props => (props.hiddenSm ? "none" : "initial")};
    padding: 14px 0 14px 0;
  }
  @media (min-width: 1300px) {
    font-size: 1.6rem;
  }
  @media (min-width: 1500px) {
    font-size: 1.8rem;
  }
`;
const Flex = styled.div`
  display: flex;
  width: 100%;
`;
const AddressMap = () => (
  <Wrapper>
    <MainTitle>Contact</MainTitle>
    <Flex>
      <Map>
        <GoogleMapContainer />
      </Map>

      <Address>
        <MainTitle hiddenSm>Contact</MainTitle>
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
        <div>
          <h5>Address</h5>
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
      </Address>
    </Flex>
  </Wrapper>
);

export default AddressMap;
