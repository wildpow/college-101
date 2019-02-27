import React from "react";

const StudentPicker = props => {
  const { students, enrolled } = props;
  const filterdStudents = [];
  students.map(student => {
    if (filterdStudents.length === 0) {
      filterdStudents.push(student);
    }
  });
  return (
    <div>
      <form>
        <select name="student">
          <option value={-1}>Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {`${student.firstName} ${student.lastName}`}
            </option>
          ))}
        </select>
        <button type="button">Add Student</button>
      </form>
      <div />
    </div>
  );
};

export default StudentPicker;
