import React from "react";
import { navigate, Link } from "gatsby";
import { logout } from "../../services/auth";

const AdminNav = () => {
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
      <Link
        to="/dashboard/reports"
        activeStyle={{
          backgroundColor: "#4caf50",
          color: "white",
        }}
      >
        reports
      </Link>
      <Link
        to="/dashboard/payments"
        activeStyle={{
          backgroundColor: "#4caf50",
          color: "white",
        }}
      >
        payments
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

export default AdminNav;
