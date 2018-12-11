import React from "react";
import { Link, navigate } from "gatsby";
// import styled from "styled-components";
import {
  getUser,
  isLoggedIn,
  logout,
  handleLogin,
} from "../../admin/services/auth";

import MobileButton from "../mobileMenu/mobileButton";
import {
  FixedWrapper,
  NavWrapper,
  LeftSideNav,
  RightSideNav,
} from "./navbarStyles";

const Navbar = props => {
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
            <Link
              onClick={props.handleHomeButton}
              to="/"
              activeStyle={
                {
                  // backgroundColor: "#4caf50",
                  // color: "white",
                }
              }
            >
              College101Prep
            </Link>
          )}
        </LeftSideNav>
        <RightSideNav>
          {isLoggedIn() ? (
            <>
              <Link
                to="/admin/"
                activeStyle={{
                  backgroundColor: "#4caf50",
                  color: "white",
                }}
              >
                main
              </Link>
              <Link
                to="/admin/package"
                activeStyle={{
                  backgroundColor: "#4caf50",
                  color: "white",
                }}
              >
                package
              </Link>
              <Link
                to="/admin/students"
                activeStyle={{
                  backgroundColor: "#4caf50",
                  color: "white",
                }}
              >
                students
              </Link>
              <Link
                to="/admin/teachers"
                activeStyle={{
                  backgroundColor: "#4caf50",
                  color: "white",
                }}
              >
                teachers
              </Link>
              <Link
                to="/admin/attendance"
                activeStyle={{
                  backgroundColor: "#4caf50",
                  color: "white",
                }}
              >
                attendance
              </Link>
              <a
                href="/"
                onClick={event => {
                  event.preventDefault();
                  logout(() => navigate("/"));
                }}
              >
                logout
              </a>
            </>
          ) : (
            <>
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
                about
              </Link>

              <Link
                to="/payment"
                activeStyle={{
                  backgroundColor: "#4caf50",
                  color: "white",
                }}
              >
                payment
              </Link>
              <a
                href="/app"
                onClick={event => {
                  event.preventDefault();
                  handleLogin(user => navigate("/admin"));
                }}
              >
                admin
              </a>
            </>
          )}
        </RightSideNav>
        {/* <div style={{ marginTop: "16px" }}> */}
        <MobileButton
          activeButton={props.activeButton}
          handleActiveButton={props.handleActiveButton}
        />
        {/* </div> */}
      </NavWrapper>
    </FixedWrapper>
  );
};
export default Navbar;
