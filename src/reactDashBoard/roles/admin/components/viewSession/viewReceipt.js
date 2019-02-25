import React from "react";
import { Button } from "grommet";

const ViewReceipt = props => {
  return (
    <>
      {console.log(props)}
      <Button
        label="View Receipt"
        onClick={() => console.log("view receipt")}
      />
    </>
  );
};

export default ViewReceipt;
