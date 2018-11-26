import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

const Image2 = props => {
  return <div />;
};

export const ImageSearch = graphql`
  query ImageSearch($imgName: String!, $maxWidth: Int) {
    placeholderImage: file(relativePath: { eq: $imgName }) {
      childImageSharp {
        fluid(maxWidth: $maxWidth) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default Image2;
