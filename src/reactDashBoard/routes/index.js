import React from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { getUser } from "../services/auth";
import Teacher from "../roles/teacher";
import Admin from "../roles/admin";
import Customer from "../roles/customer";
import QueryUserNames from "../queryComponents/QueryUserNames";
import QueryTeacher from "../queryComponents/QueryTeacher";

const Container = styled.div`
  margin-top: 10px;
`;

const Main = () => {
  const user = getUser();
  const role = user.app_metadata.roles;
  if (role === undefined) {
    return (
      <Container>
        <QueryUserNames component={Customer} userName={user.email} />
      </Container>
    );
  }
  if (user.app_metadata.roles[0] === "admin") {
    return (
      <Container>
        <Admin userName={user.email} />
      </Container>
    );
  }
  if (user.app_metadata.roles[0] === "teacher") {
    return (
      <Container>
        <QueryTeacher component={Teacher} userName={user.email} />
      </Container>
    );
  }
  return null;
};

export default Main;
