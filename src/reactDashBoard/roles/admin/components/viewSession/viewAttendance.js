import React, { useState } from "react";
import { Button, Layer, Box, Text } from "grommet";
import { View, Alert } from "grommet-icons";
import LayerHeader from "../sharedComponents/layerHeader";

const ViewAttendance = ({ session }) => {
  const [open, setOpen] = useState(false);
  const createdBy = session.attendance.createdByUser
    ? `${session.attendance.createdByUser.firstName} ${
        session.attendance.createdByUser.lastName
      }`
    : "None Provided";
  const notes =
    session.attendance.notes.length !== 0 ? session.attendance.notes : false;
  const extraStudents =
    session.attendance.extraStudents.length !== 0
      ? session.attendance.extraStudents
      : false;
  const createdAt = new Date(session.attendance.createdAt).toLocaleString();
  return (
    <>
      {console.log(session)}
      {extraStudents ? (
        <Button
          onClick={() => setOpen(true)}
          label="Extra Students"
          icon={<Alert />}
          color="status-warning"
        />
      ) : (
        <Button
          onClick={() => setOpen(true)}
          label="Attendance"
          icon={<View />}
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
          <LayerHeader headingText="View Attendance" modelFunc={setOpen} />
          <Box fill="vertical" overflow="auto" width="medium" pad="medium">
            <Box
              fill
              justify="start"
              overflow="scroll"
              pad={{ vertical: "small" }}
              gap="medium"
            >
              <Text weight="bold">Created At:</Text>
              {createdAt}
              <Text weight="bold">Created By:</Text>
              {createdBy}
              <Text weight="bold">Notes</Text>
              {notes ? <>{notes.map(note => ({ note }))}</> : "None provided"}
              <Text weight="bold">Extra Students</Text>
              {console.log(extraStudents)}
              {extraStudents ? (
                <>
                  {extraStudents.map(stu => (
                    <div key={stu}>{stu}</div>
                  ))}
                </>
              ) : (
                <>poop</>
              )}
              {/* {extraStudents ? (
                <>{extraStudents.map(student => ({ student }))}</>
              ) : (
                <>None provided</>
              )}
              } */}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ViewAttendance;
