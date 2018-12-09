import React from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { getUser } from "./services/auth";
import ViewTeacher from "./components/viewTeacher";
// import CreateTeacher from "./components/createTeacher";
import ViewSessions2 from "./components/viewSessions2";
import Session from "./components/session";

const Main = () => {
  // const user = getUser();
  return (
    <>
      {/* {console.log(user.app_metadata.roles[0] === "admin")} */}
      {/* <h1>Your Main App</h1>
      <ul>
        <li>
          API:
          {user.api && user.api.apiURL}
        </li>
        <li>
          ID:
          {user.id}
        </li>
      </ul> */}

      <ViewTeacher />
      <ViewSessions2 />
      <Session />
    </>
  );
};

export default Main;
