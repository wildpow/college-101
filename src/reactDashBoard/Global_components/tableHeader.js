import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box, Button, TableCell, TableHeader, TableRow, Text } from "grommet";
import { FormUp, FormDown } from "grommet-icons";

const HeaderCell = styled.th`
  background-color: darkslategrey;
  color: #fffaf0;
  position: sticky;
  top: 0;
  z-index: 5;
`;
const InvisableIcon = styled(FormDown)`
  fill: transparent;
  stroke: transparent;
`;

const ViewTableHeader = ({ columns, sortProperty, sortDirection, onSort }) => {
  const sortIcon =
    sortDirection === "asc" ? (
      <FormDown color="white" size="medium" />
    ) : (
      <FormUp color="white" size="medium" />
    );

  return (
    <TableHeader>
      <TableRow>
        {columns.map(c => (
          <HeaderCell key={c.property} scope="col" size={c.size} plain>
            {c.property !== "attendence" && c.property !== "actions" ? (
              <Button fill hoverIndicator onClick={() => onSort(c.property)}>
                <Box
                  direction="row"
                  pad={{ horizontal: "small", vertical: "xsmall" }}
                  justify="between"
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
          </HeaderCell>
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
  onSort: PropTypes.func.isRequired,
};
export default ViewTableHeader;
