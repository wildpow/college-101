import React from "react";
import styled from "styled-components";
import Pricing from "./pricing2";
import AddressMap from "./AddressMap";

const FooterFlex = styled.footer`
  color: white;
  /* background-color: green; */
  display: flex;
  justify-content: space-evenly;
  font-family: Verdana, sans-serif;

  flex-direction: column;
  @media (min-width: 1220px) {
    flex-direction: row;
  }
`;

const Footer = () => (
  <FooterFlex>
    <Pricing />
    <AddressMap />
  </FooterFlex>
);

export default Footer;
