import React from "react";
// import { Link } from "gatsby";
import Layout from "../components/layout";
// import Image from "../components/image";
import Logo from "../images/logo.png";

const IndexPage = () => (
  <Layout>
    <header>
      <img src={Logo} alt="College 101 main logo" />
    </header>
    <main>
      <p>
        College 101 provides group and private tutoring in Math, English,
        Science, History and AP for Middle School and High School students. We
        also offer homework help for grades 4-6.
      </p>
    </main>
  </Layout>
);

export default IndexPage;
