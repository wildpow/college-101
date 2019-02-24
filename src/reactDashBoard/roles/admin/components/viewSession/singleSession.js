import React from "react";
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
          onClick={() => sessionOnClick(session.id)}
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
            <Text>{session.course.name}</Text>
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
          onClick={() => sessionOnClick(session.id)}
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
          onClick={() => sessionOnClick(session.id)}
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
            <Text>{timeFormat(session.startTime)}</Text>
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
          onClick={() => sessionOnClick(session.id)}
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
            <Text>{timeFormat(session.endTime)}</Text>
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
          onClick={() => sessionOnClick(session.id)}
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
          onClick={() => sessionOnClick(session.id)}
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
            <Text>{session.attendance ? "taken" : "none"}</Text>
          </Box>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SingleSession;
