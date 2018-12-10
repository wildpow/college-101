import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/layout";
// import NavBar from "./components/NavBar";
import Attendance from "./pages/attendance";
import Main from "./pages/main";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import Teacher from "./pages/teacher";
import Student from "./pages/students";

const Admin = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/admin/attendance" component={Attendance} />
      <PrivateRoute path="/admin/teacher" component={Teacher} />
      <PrivateRoute path="/admin/student" component={Student} />
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
