import React from "react";
import { Link, navigate } from "gatsby";
// import styled from "styled-components";
import {
  getUser,
  isLoggedIn,
  logout,
  handleLogin,
} from "../../reactDashBoard/services/auth";
import NavSwitch from "./navSwtich";
import MobileButton from "../mobileMenu/mobileButton";
import {
  FixedWrapper,
  NavWrapper,
  LeftSideNav,
  RightSideNav,
} from "./navbarStyles";

const Navbar = props => {
  const { activeButton, handleActiveButton, handleHomeButton } = props;
  const user = getUser();
  return (
    <FixedWrapper>
      <NavWrapper>
        <LeftSideNav>
          {isLoggedIn() ? (
            <h2>
              {user.user_metadata && user.user_metadata.full_name.toLowerCase()}
            </h2>
          ) : (
            <Link onClick={handleHomeButton} to="/">
              College101Prep
            </Link>
          )}
        </LeftSideNav>
        <RightSideNav>
          <NavSwitch />
        </RightSideNav>
        {/* <div style={{ marginTop: "16px" }}> */}
        <MobileButton
          activeButton={activeButton}
          handleActiveButton={handleActiveButton}
        />
        {/* </div> */}
      </NavWrapper>
    </FixedWrapper>
  );
};
export default Navbar;
