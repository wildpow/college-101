import React from "react";
import { Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { Router } from "@reach/router";
import Layout from "../gatsbyComponents/layout";
import Main from "./routes";
import PrivateRoute from "./Global_components/PrivateRoute";
import Login from "./routes/login";
import Reports from "./routes/reports";
import AdminRoutes from "./Global_components/adminRoutes";
import Payments from "./routes/payments";

const DashBoard = () => (
  <Layout>
    <Grommet theme={hpe}>
      <Router>
        <AdminRoutes path="/dashboard/reports" component={Reports} />
        <AdminRoutes path="/dashboard/payments" component={Payments} />
        <PublicRoute path="/dashboard">
          <PrivateRoute path="/" component={Main} />
          <Login path="/login" />
        </PublicRoute>
      </Router>
    </Grommet>
  </Layout>
);

function PublicRoute(props) {
  const { children } = props;
  return <div>{children}</div>;
}

export default DashBoard;
