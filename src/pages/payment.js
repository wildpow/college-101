import React from "react";
import Layout from "../components/layout";
import Link from "gatsby-link";
import Checkout from "../components/checkout.js";

const Payment = () => (
  <Layout>
    <div>
      <h1>
        <Checkout />
      </h1>
    </div>
  </Layout>
);

export default Payment;
