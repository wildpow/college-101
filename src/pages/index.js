import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import Award from "../images/awards.jpeg";
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

const Main = styled.div`
  height: 80vh;
  font-family: Verdana, sans-serif;
`;
const HeroText = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
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
        <button type="button">View Schedule</button>
      </HeroText>
      {/* </HeroImage> */}
    </Main>
    <div>
      <div>
        <h2>Academic Tutoring</h2>
        <div>
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
        </div>
      </div>
      <div>
        <h3>Science</h3>
        <div>
          <ul>
            <li>Earth Science</li>
            <li>Living Environment</li>
            <li>Chemistry</li>
            <li>Physics</li>
            <li>AP</li>
          </ul>
        </div>
      </div>
      <div>
        <h3>English</h3>
        <div>
          <ul>
            <li>Essay Writing</li>
          </ul>
        </div>
      </div>
      <div>
        <h3>History</h3>
        <div>
          <ul>
            <li>World History</li>
            <li>U.S. History</li>
            <li>AP</li>
          </ul>
        </div>
      </div>

      <div>
        <h2>Test Prepatation</h2>
        <div>
          <ul>
            <li>PSAT</li>
            <li>SAT</li>
            <li>ACT</li>
            <li>GRE</li>
            <li>Subject Exams</li>
            <li>CHSEE</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Awards</h2>
        <p>
          College 101 is celebrating it's Sweet 16! We have been lucky to work
          with more than 1500 students during our 16 years in 3 Village!
        </p>
        <p>
          College 101 has been nominated as one of Long Island's Best Tutoring
          centers 3 times!
        </p>
        <img src={Award} />
        <StaticQuery
          query={graphql`
            query {
              placeholderImage: file(relativePath: { eq: "awards.jpeg" }) {
                childImageSharp {
                  resolutions(width: 450, quality: 90) {
                    ...GatsbyImageSharpResolutions
                  }
                }
              }
            }
          `}
          render={data => (
            <Img
              resolutions={data.placeholderImage.childImageSharp.resolutions}
            />
          )}
        />
      </div>
    </div>
    {/* <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p> */}
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
