import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Button, TableCell, TableHeader, TableRow, Text } from "grommet";
import { FormUp, FormDown } from "grommet-icons";

const InvisableIcon = styled(FormDown)`
  fill: transparent;
  stroke: transparent;
`;

const ViewTableHeader = ({ columns, sortProperty, sortDirection }) => {
  const sortIcon = sortDirection === "asc" ? <FormDown /> : <FormUp />;

  return (
    <TableHeader>
      <TableRow>
        {columns.map(c => (
          <TableCell key={c.property} scope="col" size={c.size} plain>
            {c.property !== "attendence" && c.property !== "actions" ? (
              <Button
                fill
                hoverIndicator
                onClick={() => this.onSort(c.property)}
              >
                <Box
                  direction="row"
                  pad={{ horizontal: "small", vertical: "xsmall" }}
                  justify="start"
                  border="bottom"
                  gap="xsmall"
                >
                  <Text size="large" truncate weight="bold">
                    {c.label}
                  </Text>
                  {sortProperty === c.property ? sortIcon : <InvisableIcon />}
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
                <Text size="large" truncate weight="bold">
                  {c.label}
                </Text>
              </Box>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHeader>
  );
};
ViewTableHeader.defaultProps = {
  columns: [
    { property: "name", label: "Class", size: "small" },
    { property: "timeAndPrice", label: "Group", size: "small" },
  ],
};
ViewTableHeader.propTypes = {
  sortDirection: PropTypes.string.isRequired,
  columns: PropTypes.instanceOf(Object),
  sortProperty: PropTypes.string.isRequired,
};
export default ViewTableHeader;