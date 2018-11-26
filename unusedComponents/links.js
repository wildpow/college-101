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
  {
    linkText: "For more info and to register for ACT",
    href: "http://www.act.org/",
  },
  {
    linkText: "Common App",
    href: "https://www.commonapp.org/",
  },
  {
    linkText: "College Planning",
    href: "https://www.lockwoodcollegeprep.com/",
  },
  {
    linkText: "NCAA",
    href: "http://www.ncaa.org/",
  },
  {
    linkText: "GRE",
    href: "http://www.ets.org/gre/",
  },
  {
    linkText: "ETS",
    href: "http://www.ets.org/",
  },
];

const HelpfulLinks = () => (
  <Layout>
    <h1>Helpful Links</h1>
    <ul>
      {LinkStore.map(link => (
        <li>
          <a
            href={link.href}
            key={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.linkText}
          </a>
        </li>
      ))}
    </ul>
  </Layout>
);

export default HelpfulLinks;
