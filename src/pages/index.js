import React from "react";
import Home from "../components/homePage";
import Layout from "../components/layout";
import { initAuth } from "../admin/services/auth";

initAuth();
const IndexPage = () => (
  <Layout>
    <Home />
  </Layout>
);

export default IndexPage;
