import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Heading, Box, Text, Select } from "grommet";
import { FormClose, StatusGood } from "grommet-icons";
import { TitleWrapper } from "../../sharedStyles/slideLayer";
import { ALL_SESSIONS } from "../../../../queryComponents/QuerySessions";

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
  const { data } = props;
  const students = [];
  const studentIds = [];
  data.students.map(student => {
    students.push(`${student.firstName} ${student.lastName}`);
    studentIds.push(student.id);
    return null;
  });
  const [studentList, setList] = useState(students);
  const [selectStudent, setStudent] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const onSearch = searchText => {
    const regexp = new RegExp(searchText, "i");
    setList(students.filter(o => o.match(regexp)));
  };
  return (
    <Box>
      {console.log(props.session)}
      {/* {console.log(students, studentIds)} */}
      <Button onClick={() => setOpen(true)} label="Add Student" />
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <TitleWrapper
            background="#61a785"
            flex={false}
            direction="row"
            justify="between"
            elevation="xlarge"
            pad={{
              left: "medium",
              right: "medium",
              top: "xsmall",
              bottom: "xsmall",
            }}
          >
            <Heading level={2} margin="none" color="floralwhite">
              Add Student
            </Heading>
            <Button
              icon={<FormClose color="floralwhite" size="large" />}
              onClick={() => setOpen(false)}
            />
          </TitleWrapper>
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
                  console.log("heloo");
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
                  setSuccess(true);
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
                      // onChange={event => setStudent(event.value)}
                      options={studentList}
                      onSearch={searchText => onSearch(searchText)}
                      // multiple
                    />
                    <Button label="Add Student" type="submit" />
                  </Box>
                </Box>
              </Box>
            )}
          </Mutation>
        </Layer>
      )}
      {success && (
        <Layer
          margin={{ bottom: "20px" }}
          position="bottom"
          // full="horizontal"
          modal={false}
          responsive={false}
          onEsc={setSuccess(false)}
        >
          <Box
            background="floralwhite"
            align="start"
            pad={{ vertical: "medium", horizontal: "small" }}
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              round="medium"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
              background="status-ok"
            >
              <Box align="center" direction="row" gap="medium">
                <StatusGood size="large" />
                <Text size="xlarge" weight="bold">
                  Student Added
                </Text>
              </Box>
              <Button
                icon={<FormClose size="large" />}
                onClick={setSuccess(false)}
                plain
              />
              {console.log("sefjwefoiw")}
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default AddStudent;
