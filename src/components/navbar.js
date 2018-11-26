import React from "react";
import { Link } from "gatsby";
// import styled from "styled-components";
import MobileButton from "./mobileMenu/mobileButton";
import {
  FixedWrapper,
  NavWrapper,
  LeftSideNav,
  RightSideNav,
} from "../styles/navbarStyles";

const Navbar = props => (
  <FixedWrapper>
    <NavWrapper>
      <LeftSideNav>
        <Link
          to="/"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          College101Prep
        </Link>
      </LeftSideNav>
      <RightSideNav>
        <Link
          to="/schedule"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          schedule
        </Link>
        <Link
          to="/about"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          About
        </Link>
        {/* <Link
          to="/links"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          Helpful Links
        </Link> */}
        {/* <Link
          to="/pricing"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          Tuition Pricing
        </Link> */}
        {/* <Link
          to="/sat-act"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          SAT/ACT
        </Link> */}
        {/* <Link
          to="/register"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          register
        </Link> */}
        <Link
          to="/payment"
          activeStyle={{
            backgroundColor: "#4caf50",
            color: "white",
          }}
        >
          payment
        </Link>
      </RightSideNav>

      <MobileButton
        activeButton={props.activeButton}
        handleActiveButton={props.handleActiveButton}
      />
    </NavWrapper>
  </FixedWrapper>
);

export default Navbar;
