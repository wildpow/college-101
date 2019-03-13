import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import { Button, Layer, Heading, Box, Select } from "grommet";
import { UserAdd } from "grommet-icons";
import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";
import LayerHeader from "../sharedComponents/layerHeader";
import QueryAdminViewAll from "../../../../queryComponents/QueryAdminViewAll";

const ADD_STUDENT = gql`
  mutation($students: [StudentWhereUniqueInput!], $sessionId: ID) {
    updateSession(
      where: { id: $sessionId }
      data: { students: { connect: $students } }
    ) {
      id
    }
  }
`;

const AddStudent = props => {
  const {
    eventTimer,
    setMessage,
    startTimeCheck,
    endTimeTimeCheck,
    students: propStudents,
  } = props;
  const students = [];
  const studentIds = [];
  propStudents.map(student => {
    students.push(`${student.firstName} ${student.lastName}`);
    studentIds.push(student.id);
    return null;
  });
  const [studentList, setList] = useState(students);
  const [selectStudent, setStudent] = useState("");
  const [open, setOpen] = useState(false);
  const onSearch = searchText => {
    const regexp = new RegExp(searchText, "i");
    setList(students.filter(o => o.match(regexp)));
  };
  return (
    <Box>
      {startTimeCheck && endTimeTimeCheck && (
        <Button
          onClick={() => setOpen(true)}
          label="Add Student"
          disabled
          icon={<UserAdd />}
        />
      )}
      {startTimeCheck && !endTimeTimeCheck && (
        <>
          <Button
            onClick={() => setOpen(true)}
            label="Add Student"
            icon={<UserAdd />}
          />
        </>
      )}
      {!startTimeCheck && !endTimeTimeCheck && (
        <Button
          onClick={() => setOpen(true)}
          label="Add Student"
          icon={<UserAdd />}
        />
      )}
      {/* Need to delete this state once the create Session is working correctly */}
      {!startTimeCheck && endTimeTimeCheck && (
        <Button
          onClick={() => setOpen(true)}
          label="Not possible"
          disabled
          icon={<UserAdd />}
        />
      )}
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <LayerHeader headingText="Add Student" modelFunc={setOpen} />
          <Mutation
            mutation={ADD_STUDENT}
            refetchQueries={() => {
              return [
                {
                  query: ALL_SESSIONS,
                },
              ];
            }}
          >
            {updateSession => (
              <Box
                fill="vertical"
                overflow="auto"
                width="medium"
                pad="medium"
                as="form"
                onSubmit={event => {
                  event.preventDefault();
                  const fomatStudents = [];
                  selectStudent.map((item, index) => {
                    const itemObj = { id: studentIds[index] };
                    fomatStudents.push(itemObj);
                    return null;
                  });
                  updateSession({
                    variables: {
                      sessionId: props.session.id,
                      students: fomatStudents,
                    },
                  });

                  setOpen(false);
                  setMessage("Student or Students Added");
                  eventTimer();
                }}
              >
                <Box
                  fill
                  justify="start"
                  overflow="scroll"
                  pad={{ vertical: "small" }}
                  gap="medium"
                >
                  <Box>
                    <Heading level={4}>Add existing student</Heading>
                    <Select
                      multiple
                      searchPlaceholder="Search Student"
                      placeholder="Select One or Multiple Students"
                      value={selectStudent}
                      onChange={({ value: nextValue }) => setStudent(nextValue)}
                      options={studentList}
                      onSearch={searchText => onSearch(searchText)}
                    />
                    <Button label="Add Student" type="submit" />
                  </Box>
                </Box>
              </Box>
            )}
          </Mutation>
        </Layer>
      )}
    </Box>
  );
};

AddStudent.defaultProps = {
  startTimeCheck: false,
  endTimeTimeCheck: false,
};
AddStudent.propTypes = {
  eventTimer: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  session: PropTypes.instanceOf(Object).isRequired,
  students: PropTypes.shape({ type: PropTypes.oneOf([QueryAdminViewAll]) })
    .isRequired,
  startTimeCheck: PropTypes.bool,
  endTimeTimeCheck: PropTypes.bool,
};

export default AddStudent;
