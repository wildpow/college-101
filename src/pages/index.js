import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
// import Award from "../images/awards.jpeg";
// import { Link } from "gatsby";
import Layout from "../components/layout";
import Image from "../components/image";
// import Hero from "../images/hero.jpg";

// const HeroImage = styled.div`
//   background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
//     url(${Hero});
//   height: 100%;
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   position: relative;
// `;
const AwardImageWrapper = styled.div`
  max-width: 150px;
`;
const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  flex-basis: 30%;
`;

const AwardText = styled.div`
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: Verdana, sans-serif;
  margin-top: 5px;
  margin-bottom: 400px; //get rid of this!!!
  div h2 {
    text-align: center;
    font-size: 1.6rem;
    @media (min-width: 1200px) {
      font-size: 2rem;
    }
    @media (min-width: 1350px) {
      font-size: 2.4rem;
    }
  }
`;
const TestPrep = styled.div`
  text-align: center;
  ul {
    list-style: none;
  }
  ul li {
    padding: 2px 15px 10px 15px;
    font-size: 1.4em;
  }
`;
const SubjectWrapper = styled.div`
  h3 {
    text-align: center;
    text-decoration: underline;
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 2px 10px 2px 10px;
  }
  ul li {
    padding-bottom: 4px;
    text-align: center;
  }
`;
const ActWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 0px 10px 0px 10px;
`;

const Historys = () => (
  <SubjectWrapper>
    <h3>History</h3>
    <ul>
      <li>World History</li>
      <li>U.S. History</li>
      <li>AP</li>
    </ul>
  </SubjectWrapper>
);

const English = () => (
  <SubjectWrapper>
    <h3>English</h3>
    <ul>
      <li>Essay Writing</li>
    </ul>
  </SubjectWrapper>
);
const Science = () => (
  <SubjectWrapper>
    <h3>Science</h3>
    <ul>
      <li>Earth Science</li>
      <li>Living Environment</li>
      <li>Chemistry</li>
      <li>Physics</li>
      <li>AP</li>
    </ul>
  </SubjectWrapper>
);
const Maths = () => (
  <SubjectWrapper>
    <h3>Math</h3>
    <ul>
      <li>Algebra</li>
      <li>Geometry</li>
      <li>Algebra 2 Trig</li>
      <li>Calculus</li>
      <li>Statistics</li>
      <li>AP</li>
      <li>6-8th Grade</li>
      <li>Honors</li>
    </ul>
  </SubjectWrapper>
);

const Main = styled.div`
  position: relative;
  /* max-width: 800px; */
  margin: 0 auto;
  font-family: Verdana, sans-serif;
`;

const Button = styled.button`
  /* display: inline-block; */
  padding: 0.5em 3em;
  border: 0.16em solid #ffffff;
  display: block;
  margin: 0.4em auto;
  /* box-sizing: border-box; */
  text-decoration: none;
  text-transform: uppercase;
  font-family: Verdana, sans-serif;

  font-weight: 400;
  color: #ffffff;
  text-align: center;
  transition: all 0.15s;
  background: transparent;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #dddddd;
    border-color: #dddddd;
  }
  &:active {
    color: #bbbbbb;
    border-color: #bbbbbb;
  }
  @media all and (max-width: 30em) {
    display: block;
    text-align: center;
    right: 0;
    margin: 0.4em auto;
  }
`;

const HeroText = styled.div`
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  /* width: 100%; Full width */
  padding: 10px 6px 10px 6px; /* Some padding */
  @media (min-width: 768px) {
    padding: 5px 7px 20px 7px;
    top: 50%;
    left: 50%;
    bottom: initial;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    max-width: 600px;
    /* text-align: center; */
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
const IndexPage = () => (
  <Layout>
    <Main>
      <Image />
      {/* <HeroImage> */}
      <HeroText>
        <p>
          College 101 provides group and private tutoring in Math, English,
          Science, History and AP for Middle School and High School students. We
          also offer homework help for grades 4-6.
        </p>
        <Button type="button">View Schedule</Button>
      </HeroText>
      {/* </HeroImage> */}
    </Main>

    <Wrapper>
      <Card>
        <h2>Academic Tutoring</h2>
        <ActWrapper>
          <div>
            <Maths />
            <English />
          </div>
          <div>
            <Science />
            <Historys />
          </div>
        </ActWrapper>
      </Card>

      <Card>
        <TestPrep>
          <h2>Test Prepatation</h2>
          <ul>
            <li>PSAT</li>
            <li>SAT</li>
            <li>ACT</li>
            <li>GRE</li>
            <li>Subject Exams</li>
            <li>CHSEE</li>
          </ul>
        </TestPrep>
      </Card>
      <Card>
        <h2>Awards</h2>
        <AwardText>
          <p>
            College 101 is celebrating it's Sweet 16! We have been lucky to work
            with more than 1500 students during our 16 years in 3 Village!
          </p>
          <p>
            College 101 has been nominated as one of Long Island's Best Tutoring
            centers 3 times!
          </p>
        </AwardText>
        <AwardImageWrapper>
          {/* <img src={Award} /> */}
          <StaticQuery
            query={graphql`
              query {
                awardImg: file(relativePath: { eq: "awards.jpeg" }) {
                  childImageSharp {
                    fluid(maxWidth: 450, quality: 90) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            `}
            render={data => <Img fluid={data.awardImg.childImageSharp.fluid} />}
          />
        </AwardImageWrapper>
      </Card>
    </Wrapper>
    <div />
  </Layout>
);

export default IndexPage;

// const HeroHeader = styled.header`
//   /* max-width: 1500px;
//   position: relative; */
//   letter-spacing: 4px;
//   margin-left: auto;
//   margin-right: auto;
//   height: 80vh;
//   & img {
//     width: 100%;
//     /* height: 80%; */
//     max-width: 100%;
//     height: auto;
//   }
//   & p {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-80%, -50%);
//     background-color: white;
//     padding: 20px;
//     box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
//       0 2px 10px 0 rgba(0, 0, 0, 0.12);
//     border-radius: 4px;
//     line-height: 1.3rem;
//     text-align: center;
//   }
// `;

// const Main = styled.main`
//   height: 100vh;
//   width: 100vw;
// `;

// const Main = styled.div`

//   font-family: Verdana, sans-serif;
// `;
// const HeroText = styled.div`
//   text-align: center;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   color: white;
//   background: rgb(0, 0, 0);
//   background: rgba(0, 0, 0, 0.5);
//   border-radius: 4px;
//   max-width: 600px;
//   padding: 5px 7px 20px 7px;
//   p {
//     font-size: 1.1em;
//     line-height: 1.4em;
//     @media (min-width: 810px) {
//       font-size: 1.2em;
//       line-height: 1.5em;
//       letter-spacing: 0.1em;
//     }
//   }
//   button {
//     display: inline-block;
//     padding: 0.5em 3em;
//     border: 0.16em solid #ffffff;
//     margin: 0 0.3em 0.3em 0;
//     box-sizing: border-box;
//     text-decoration: none;
//     text-transform: uppercase;
//     font-family: Verdana, sans-serif;

//     font-weight: 400;
//     color: #ffffff;
//     text-align: center;
//     transition: all 0.15s;
//     background: transparent;
//     outline: none;
//     cursor: pointer;
//   }
//   button:hover {
//     color: #dddddd;
//     border-color: #dddddd;
//   }
//   button:active {
//     color: #bbbbbb;
//     border-color: #bbbbbb;
//   }
//   @media all and (max-width: 30em) {
//     button {
//       display: block;
//       margin: 0.4em auto;
//     }
//   }
// `;
