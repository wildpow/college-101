import React from "react";
import Home from "../gatsbyComponents/homePage";
import Layout from "../gatsbyComponents/layout";
import { initAuth } from "../reactDashBoard/services/auth";

initAuth();
const IndexPage = () => (
  <Layout>
    <Home />
  </Layout>
);

export default IndexPage;
