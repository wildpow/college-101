import React from "react";
import { getUser } from "./services/auth";
import ViewTeacher from "./components/viewTeacher";
import CreateTeacher from "./components/createTeacher";

const Main = () => {
  const user = getUser();
  return (
    <>
      {console.log(user)}
      <h1>Your Main App</h1>
      <ul>
        <li>
          API:
          {user.api && user.api.apiURL}
        </li>
        <li>
          ID:
          {user.id}
        </li>
      </ul>

      <ViewTeacher />
    </>
  );
};

export default Main;
