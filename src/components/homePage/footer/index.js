import React from "react";
import styled from "styled-components";
import Pricing from "./pricing";
import AddressMap from "./AddressMap";

const FooterFlex = styled.footer`
  color: white;
  background-color: green;
  display: flex;
  justify-content: space-evenly;
  font-family: Verdana, sans-serif;
`;

const Footer = () => (
  <FooterFlex>
    <AddressMap />
    <Pricing />
  </FooterFlex>
);

export default Footer;
