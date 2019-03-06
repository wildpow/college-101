import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import { FormUp, FormDown } from "grommet-icons";

const ScrollBox = styled(Box)`
  overflow-y: scroll !important;
  overflow: scroll;
  max-height: 317px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.33);
`;

const COLUMNS = [
  {
    property: "name",
    label: "Class",
    size: "xsmall",
  },
  {
    property: "Group",
    label: "Group",
    size: "small",
  },
  {
    property: "startTime",
    label: "Start Time",
    size: "small",
  },
  {
    property: "endTime",
    label: "End Time",
    size: "small",
  },
  {
    property: "maxSizeOfClass",
    label: "Enrollment",
    size: "small",
  },
  {
    property: "attendence",
    label: "Attendance",
    size: "small",
  },
];

class ViewSessionTeacher extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      notSure: "yes",
    };
  }

  render() {
    return (
      <>
        <Box>
          <Table caption="Session table header">
            <TableHeader>
              <TableRow>
                {COLUMNS.map(c => (
                  <TableCell key={c.property} scope="col" size={c.size} plain>
                    {c.property !== "attendence" && c.property !== "actions" ? (
                      <Button
                        fill
                        hoverIndicator
                        onClick={() => console.log("please fix")}
                        // this.onSort(c.property)
                      >
                        <Box
                          direction="row"
                          pad={{ horizontal: "small", vertical: "xsmall" }}
                          justify="start"
                          border="bottom"
                          gap="xsmall"
                        >
                          <Text size="large" truncate>
                            {c.label}
                          </Text>
                          {/* {sortProperty === c.property ? sortIcon : null} */}
                        </Box>
                      </Button>
                    ) : (
                      <Box
                        direction="row"
                        pad={{ horizontal: "small", vertical: "xsmall" }}
                        justify={c.align}
                        border="bottom"
                        gap="xsmall"
                      >
                        <Text size="large">{c.label}</Text>
                        {/* {sortProperty === c.property ? sortIcon : null} */}
                      </Box>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
        </Box>
      </>
    );
  }
}

export default ViewSessionTeacher;
