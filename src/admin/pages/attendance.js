import React from "react";
import { getUser } from "../services/auth";

const Attendance = () => {
  const user = getUser();
  return (
    <>
      <h1>Attendance</h1>
      <ul>
        <li>
          Name:
          {user.user_metadata && user.user_metadata.full_name}
        </li>
        <li>
          E-mail:
          {user.email}
        </li>
      </ul>
    </>
  );
};

export default Attendance;
