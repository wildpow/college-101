import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/layout";
// import NavBar from "./components/NavBar";
import Attendance from "./attendance";
import Main from "./main";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./login";

const Admin = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/admin/attendance" component={Attendance} />
      <PublicRoute path="/admin">
        <PrivateRoute path="/" component={Main} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  </Layout>
);

function PublicRoute(props) {
  return <div>{props.children}</div>;
}

export default Admin;
