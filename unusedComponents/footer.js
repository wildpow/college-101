import React from "react";
import styled from "styled-components";
import Pricing from "./pricing";

const FooterFlex = styled.footer`
  color: white;
  background-color: green;
  display: flex;
  justify-content: space-evenly;
  font-family: Verdana, sans-serif;
`;

const Footer = () => (
  <FooterFlex>
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
    <Pricing />
  </FooterFlex>
);

export default Footer;
