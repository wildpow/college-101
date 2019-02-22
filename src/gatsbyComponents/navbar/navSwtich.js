import React from "react";
import { Link, navigate } from "gatsby";
import {
  getUser,
  isLoggedIn,
  handleLogin,
} from "../../reactDashBoard/services/auth";
import CustomerNav from "../../reactDashBoard/roles/customer/customerNav";
import TeacherNav from "../../reactDashBoard/roles/teacher/teacherNav";
import AdminNav from "../../reactDashBoard/roles/admin/adminNav";

const NavSwitch = () => {
  const user = getUser();
  if (!isLoggedIn()) {
    return (
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
            handleLogin(user => navigate("/dashboard"));
          }}
        >
          login
        </a>
      </>
    );
  }
  const role = user.app_metadata.roles;
  if (role === undefined) return <CustomerNav />;
  if (role[0] === "teacher") return <TeacherNav />;
  if (role[0] === "admin") return <AdminNav />;

  return null;
};

export default NavSwitch;
