import React, { useState } from "react";
import { Box, Layer, Button, Text } from "grommet";
import { View } from "grommet-icons";
import LayerHeader from "../../admin/components/sharedComponents/layerHeader";

const ExtraInfo = ({ session }) => {
  const [layer, setLayer] = useState(false);
  return (
    <>
      {console.log(session)}
      <Button
        icon={<View />}
        label={<Text truncate>ExtraInfo</Text>}
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
            <h1>Extra students</h1>
            <ul>
              <li>View</li>
              <li>Add</li>
            </ul>
            <h1>Notes</h1>
            <ul>
              <li>View</li>
              <li>Add</li>
            </ul>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ExtraInfo;
