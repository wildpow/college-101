import React from "react";
import { Main, Wrapper, Card } from "./styles/homeStyles";
import HelpfulLinks from "./linksTestPrep/links";
import AwardImage from "./award/awardImage";
import Footer from "./footer";
import TestPrep from "./linksTestPrep/testPrep";
import AwardText from "./award/awardText";
import Hero from "./hero";
import Tutoring from "./tutoring";

const Home = () => (
  <>
    <Main>
      <Hero />
    </Main>
    <Wrapper>
      <Card>
        <Tutoring />
      </Card>

      <Card>
        <TestPrep />
        <HelpfulLinks hide1024 />
      </Card>

      <Card show1024>
        <HelpfulLinks />
      </Card>

      <Card>
        <AwardText />
        <AwardImage />
      </Card>
    </Wrapper>
    <Footer />
  </>
);

export default Home;
