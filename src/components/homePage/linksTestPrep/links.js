import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  text-align: center;
  ul {
    font-size: 1.2rem;
    list-style: none;
    padding-left: 0;
  }
  ul li {
    padding-bottom: 10px;
  }
  ul li a {
    /* text-decoration: none; */
    color: black;
    transition: all 0.3s ease-in-out;
  }
  ul li a:hover {
    color: green;
  }
`;
const LinkStore = [
  {
    linkText: "info/register for SAT",
    href: "https://collegereadiness.collegeboard.org/sat",
  },
  {
    linkText: "College Board",
    href: "https://www.collegeboard.org/",
  },
  {
    linkText: "info/register for ACT",
    href: "http://www.act.org/",
  },
  {
    linkText: "College Planning",
    href: "https://www.lockwoodcollegeprep.com/",
  },
];
const LinkStore2 = [
  {
    linkText: "Common App",
    href: "https://www.commonapp.org/",
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
const Wrapper = styled.div`
  display: ${props => (props.hide1024 ? "none" : "block")};
  @media (min-width: 1500px) {
    display: ${props => (props.hide1024 ? "block" : "none")};
  }
`;
const HelpfulLinks = props => (
  <Wrapper hide1024={props.hide1024}>
    <h2>Helpful Links</h2>
    <Container>
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
      <ul>
        {LinkStore2.map(link => (
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
    </Container>
  </Wrapper>
);

export default HelpfulLinks;
