import React from "react";
import TeacherCal from "./teacherCal";

const Employee = props => {
  const { data, userName } = props;
  if (data.teacher === null)
    return <h1>Please have your admin add you as a teacher</h1>;
  if (data.teacher.sessions.length === 0)
    return <h1>You have no scheduled classes</h1>;
  return (
    <>
      <TeacherCal
        sessions={data.teacher.sessions}
        teacher={data.teacher.userName}
      />
      <h1>{`Welcome ${data.teacher.firstName} ${data.teacher.lastName}`}</h1>
    </>
  );
};

export default Employee;
