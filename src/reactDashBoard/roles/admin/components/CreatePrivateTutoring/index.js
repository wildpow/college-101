import React, { useState } from "react";
import { Button, Layer, Box } from "grommet";
import { Add } from "grommet-icons";
import LayerHeader from "../../layerHeader";

const PrivateTutoring = props => {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      {console.log(props)}
      <Button
        icon={<Add />}
        label="Private Tutoring"
        onClick={() => setOpen(true)}
        primary
      />
      {open && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <LayerHeader headingText="Private Tutoring" modelFunc={setOpen} />
          <Box
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            as="form"
          >
            <h1>create private tutoring</h1>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default PrivateTutoring;
