import React from "react";
import Layout from "../components/layout";

const LinkStore = [
  {
    linkText: "For more info and to register for the SAT",
    href: "https://collegereadiness.collegeboard.org/sat",
  },
  {
    linkText: "College Board",
    href: "https://www.collegeboard.org/",
  },
];

const HelpfulLinks = () => (
  <Layout>
    <h1>Helpful Links</h1>
    <ul>
      {LinkStore.map(link => (
        <li>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.linkText}
          </a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default HelpfulLinks;
