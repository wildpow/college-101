import React, { useState } from "react";
import { Button, Layer, Box } from "grommet";
import LayerHeader from "../../layerHeader";

const EditSession = props => {
  const { startTimeCheck, endTimeTimeCheck, session } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      {startTimeCheck && endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Edit Session" disabled />
      )}
      {startTimeCheck && !endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Edit Session" />
      )}
      {!startTimeCheck && !endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Edit Session" />
      )}
      {/* Need to delete this state once the create Session is working correctly */}
      {!startTimeCheck && endTimeTimeCheck && (
        <Button onClick={() => setOpen(true)} label="Not possible" disabled />
      )}
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <LayerHeader headingText="Edit Session" modelFunc={setOpen} />
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            as="form"
          >
            <Box
              fill
              justify="start"
              overflow="scroll"
              pad={{ vertical: "small" }}
              gap="medium"
            >
              Edit Session
              {`props of session passed down from parent gives everything to populate this component. Example:\n ${
                session.id
              }`}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default EditSession;
