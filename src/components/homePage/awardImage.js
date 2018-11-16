import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

const AwardImageWrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

const AwardImage = () => (
  <AwardImageWrapper>
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
);

export default AwardImage;
