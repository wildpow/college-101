import React, { useState } from "react";
import { Box, Layer, Button, Text } from "grommet";
import { View } from "grommet-icons";
import LayerHeader from "../../admin/components/sharedComponents/layerHeader";

const ViewAttendance = ({ session }) => {
  const [layer, setLayer] = useState(false);
  return (
    <>
      <Button
        icon={<View />}
        label={<Text truncate>View Attendance</Text>}
        onClick={() => setLayer(!layer)}
      />
      {layer && (
        <Layer
          position="right"
          full="vertical"
          modal
          onClickOutside={() => setLayer(false)}
          onEsc={() => setLayer(false)}
        >
          <LayerHeader headingText="Take Attendance" modelFunc={setLayer} />
          <Box
            gap="small"
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
          >
            <h1>View Attendance</h1>
            {console.log(session)}
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ViewAttendance;
