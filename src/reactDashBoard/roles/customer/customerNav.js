import React from "react";
import { navigate, Link } from "gatsby";
import { logout } from "../../services/auth";

const CustomerNav = () => {
  return (
    <>
      <Link
        to="/dashboard/"
        activeStyle={{
          backgroundColor: "#4caf50",
          color: "white",
        }}
      >
        main
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
  );
};

export default CustomerNav;
