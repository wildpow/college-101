import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from "../services/auth";
import Teacher from "../roles/teacher";
import Admin from "../roles/admin";
import Customer from "../roles/customer";
import UserLoggins from "../queryComponents/userLoggins";

const Container = styled.div`
  margin-top: 50px;
`;

const Main = () => {
  const user = getUser();
  const role = user.app_metadata.roles;
  if (role === undefined) {
    return (
      <Container>
        <UserLoggins component={Customer} userName={user.email} />
      </Container>
    );
  } else if (user.app_metadata.roles[0] === "admin") {
    return (
      <Container>
        <Admin userName={user.email} />
      </Container>
    );
  } else if (user.app_metadata.roles[0] === "teacher") {
    return (
      <Container>
        <Teacher userName={user.email} />
      </Container>
    );
  }
  return null;
};

export default Main;
