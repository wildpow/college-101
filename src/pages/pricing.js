import React from "react";
import Layout from "../components/layout";

const HomeWorkHelp = () => (
  <Layout>
    <div>
      <h1>Tuition Pricing</h1>
      <h2>Small Group</h2>
      <p>Non AP</p>
      <ul>
        <li>One-Hour Small Group: $35</li>
        <li>90-Minute Small Group: $50</li>
        <li>Two-Hour Small Group $65</li>
        <li>SAT Small Group Program $750</li>
        <li>ACT Small Group Program $400</li>
        <li>ACT/SAT Combo. $900</li>
        <li>PSAT Workshop $150*</li>
        <p>
          Includes all materials, unlimited refresher classes and unlimited
          practice exams Class size limited to 8 students.
        </p>
      </ul>
      <h2>Private Tutoring</h2>
      <ul>
        <li>Subject Area $70 per hour</li>
        <li>AP $85 per hour</li>
        <li>SAT/ACT $85 per hour or$110/90-min.</li>
      </ul>
    </div>
  </Layout>
);

export default HomeWorkHelp;
