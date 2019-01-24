import React from "react";
import { Router } from "@reach/router";
import Layout from "../gatsbyComponents/layout";
import Attendance from "./routes/attendance";
import Main from "./routes";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./routes/login";
import Teachers from "./routes/teachers";
import Students from "./routes/students";
import Package from "./routes/package";
import Receipts from "./routes/receipts";

const DashBoard = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/dashboard/attendance" component={Attendance} />
      <PrivateRoute path="/dashboard/teachers" component={Teachers} />
      <PrivateRoute path="/dashboard/students" component={Students} />
      <PrivateRoute path="/dashboard/package" component={Package} />
      <PrivateRoute path="/dashboard/receipts" component={Receipts} />
      <PublicRoute path="/dashboard">
        <PrivateRoute path="/" component={Main} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  </Layout>
);

function PublicRoute(props) {
  const { children } = props;
  return <div>{children}</div>;
}

export default DashBoard;
