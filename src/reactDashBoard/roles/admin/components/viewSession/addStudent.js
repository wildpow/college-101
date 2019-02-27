import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Button, Layer, Heading, Box, Text, Select } from "grommet";
import { FormClose } from "grommet-icons";
import { TitleWrapper } from "../../sharedStyles/slideLayer";

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
  const onSearch = searchText => {
    const regexp = new RegExp(searchText, "i");
    setList(students.filter(o => o.match(regexp)));
  };
  return (
    <>
      {console.log(studentIds, props.session.id)}
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
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            as="form"
            // gap="small"
            // fill
            // overflow="scroll"
            // width="large"
            // pad={{
            //   left: "medium",
            //   right: "medium",
            //   top: "small",
            //   bottom: "medium",
            // }}
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
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default AddStudent;
