import React from "react";
import QueryStudents from "../queryComponents/all_students";
import ViewStudents from "../components/viewStudents";

const Students = () => (
  <>
    <h1>Place holder for students</h1>
    <QueryStudents component={ViewStudents} />
  </>
);
export default Students;
