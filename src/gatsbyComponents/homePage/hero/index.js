import React from "react";
import styled from "styled-components";
import HeroImage from "./heroImage";
import LinkButton from "./linkButton";

const HeroText = styled.div`
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  padding: 10px 6px 10px 6px;
  @media (min-width: 768px) {
    padding: 5px 7px 20px 7px;
    top: 50%;
    left: 50%;
    bottom: initial;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    max-width: 600px;
    p {
      font-size: 1.2em;
      line-height: 1.5em;
      letter-spacing: 0.1em;
    }
  }
  @media (min-width: 1024px) {
    padding: 15px 15px 15px 15px;
    font-size: 1.4em;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 0.9em;
    line-height: 1.5em;
  }
`;

const Hero = () => (
  <>
    <HeroImage />
    <HeroText>
      <p>
        College 101 provides group and private tutoring in Math, English,
        Science, History and AP for Middle School and High School students. We
        also offer homework help for grades 4-6.
      </p>
      <LinkButton />
    </HeroText>
  </>
);

export default Hero;
