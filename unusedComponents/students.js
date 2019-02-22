import React from "react";
import QueryStudents from "../src/reactDashBoard/queryComponents/all_students";
import ViewStudents from "../src/reactDashBoard/components/viewStudents";

const Students = () => (
  <>
    <h1>Place holder for students</h1>
    <QueryStudents component={ViewStudents} />
  </>
);
export default Students;
