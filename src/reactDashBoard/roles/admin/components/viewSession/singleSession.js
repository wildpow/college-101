import React from "react";
import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow, Text } from "grommet";
import { timeFormat } from "../../../../../utils/globalFunctions";

const SingleSession = props => {
  const {
    sessionOnClick,
    sessionOnBlur,
    background,
    sessionOnFocus,
    sessionMouseOut,
    sessionMouseOver,
    session,
  } = props;
  return (
    <TableRow key={session.id}>
      <TableCell scope="row" size="small" plain>
        <Button
          fill
          plain
          focusIndicator={false}
          hoverIndicator={false}
          onMouseOver={() => sessionMouseOver(session.id)}
          onMouseOut={() => sessionMouseOut}
          onFocus={() => sessionOnFocus(session.id)}
          onBlur={() => sessionOnBlur}
          onClick={() => sessionOnClick(session.id, session)}
        >
          <Box
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            <Text truncate>{session.course.name}</Text>
          </Box>
        </Button>
      </TableCell>
      <TableCell scope="row" size="small" plain>
        <Button
          fill
          plain
          focusIndicator={false}
          hoverIndicator={false}
          onMouseOver={() => sessionMouseOver(session.id)}
          onMouseOut={() => sessionMouseOut}
          onFocus={() => sessionOnFocus(session.id)}
          onBlur={() => sessionOnBlur}
          onClick={() => sessionOnClick(session.id, session)}
        >
          <Box
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            <Text truncate>
              {`${session.teacher.firstName} ${session.teacher.lastName}`}
            </Text>
          </Box>
        </Button>
      </TableCell>
      <TableCell scope="row" size="small" plain>
        <Button
          fill
          plain
          focusIndicator={false}
          hoverIndicator={false}
          onMouseOver={() => sessionMouseOver(session.id)}
          onMouseOut={() => sessionMouseOut}
          onFocus={() => sessionOnFocus(session.id)}
          onBlur={() => sessionOnBlur}
          onClick={() => sessionOnClick(session.id, session)}
        >
          <Box
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            <Text truncate>{timeFormat(session.startTime)}</Text>
          </Box>
        </Button>
      </TableCell>
      <TableCell scope="row" size="small" plain>
        <Button
          fill
          plain
          focusIndicator={false}
          hoverIndicator={false}
          onMouseOver={() => sessionMouseOver(session.id)}
          onMouseOut={() => sessionMouseOut}
          onFocus={() => sessionOnFocus(session.id)}
          onBlur={() => sessionOnBlur}
          onClick={() => sessionOnClick(session.id, session)}
        >
          <Box
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            <Text truncate>{timeFormat(session.endTime)}</Text>
          </Box>
        </Button>
      </TableCell>
      <TableCell scope="row" size="small" plain>
        <Button
          fill
          plain
          focusIndicator={false}
          hoverIndicator={false}
          onMouseOver={() => sessionMouseOver(session.id)}
          onMouseOut={() => sessionMouseOut}
          onFocus={() => sessionOnFocus(session.id)}
          onBlur={() => sessionOnBlur}
          onClick={() => sessionOnClick(session.id, session)}
        >
          <Box
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            <Text truncate>
              {`${session.students.length === 0 ? 0 : session.students.length}
            / 
            ${session.maxSizeOfClass}`}
            </Text>
          </Box>
        </Button>
      </TableCell>
      <TableCell scope="row" size="small" plain>
        <Button
          fill
          plain
          focusIndicator={false}
          hoverIndicator={false}
          onMouseOver={() => sessionMouseOver(session.id)}
          onMouseOut={() => sessionMouseOut}
          onFocus={() => sessionOnFocus(session.id)}
          onBlur={() => sessionOnBlur}
          onClick={() => sessionOnClick(session.id, session)}
        >
          <Box
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            <Text>
              {session.attendance ? (
                <Button label="View Attendance" />
              ) : (
                <Text color="status-critical" size="larger" weight="bold">
                  Not Taken
                </Text>
              )}
            </Text>
          </Box>
        </Button>
      </TableCell>
    </TableRow>
  );
};
SingleSession.defaultProps = {
  background: "",
};

SingleSession.propTypes = {
  sessionMouseOut: PropTypes.func.isRequired,
  sessionMouseOver: PropTypes.func.isRequired,
  sessionOnBlur: PropTypes.func.isRequired,
  sessionOnFocus: PropTypes.func.isRequired,
  sessionOnClick: PropTypes.func.isRequired,
  background: PropTypes.string,
  session: PropTypes.instanceOf(Object).isRequired,
};

export default SingleSession;
