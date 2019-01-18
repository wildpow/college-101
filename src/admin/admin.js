import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";
import Layout from "../components/layout";
// import NavBar from "./components/NavBar";
import Attendance from "./pages/attendance";
import Main from "./pages/main";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/login";
import Teachers from "./pages/teachers";
import Students from "./pages/students";
import Package from "./pages/package";
import Receipts from "./pages/receipts";

const Container = styled.div`
  margin-top: 50px;
`;

const Admin = () => (
  <Layout>
    <Container>
      <Router>
        <PrivateRoute path="/admin/attendance" component={Attendance} />
        <PrivateRoute path="/admin/teachers" component={Teachers} />
        <PrivateRoute path="/admin/students" component={Students} />
        <PrivateRoute path="/admin/package" component={Package} />
        <PrivateRoute path="/admin/receipts" component={Receipts} />
        <PublicRoute path="/admin">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Container>
  </Layout>
);

function PublicRoute(props) {
  return <div>{props.children}</div>;
}

export default Admin;
