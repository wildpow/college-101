import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Box, Button, TableCell, TableRow, Text } from "grommet";
import { timeFormat } from "../../../../utils/globalFunctions";

const ExtraPad = styled(Box)`
  padding-top: 13px;
  padding-bottom: 13px;
`;

const ExtraPadText = styled(Text)`
  padding-top: 7px;
  padding-bottom: 7px;
`;

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
          <ExtraPad
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
          </ExtraPad>
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
          <ExtraPad
            animation={{
              type: "fadeIn",
              delay: 0,
              duration: 250,
              size: "xsmall",
            }}
            background={background}
            pad={{ horizontal: "small", vertical: "xsmall" }}
          >
            {session.timeAndPrice && (
              <Text truncate>{session.timeAndPrice.name}</Text>
            )}
          </ExtraPad>
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
          <ExtraPad
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
          </ExtraPad>
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
          <ExtraPad
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
          </ExtraPad>
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
          <ExtraPad
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
          </ExtraPad>
        </Button>
      </TableCell>
      <TableCell scope="row" size="small" plain>
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
          {/* <Text> */}
          {session.attendance ? (
            <ExtraPadText size="medium" weight="bold" truncate>
              Taken
            </ExtraPadText>
          ) : (
            <ExtraPadText
              color="status-critical"
              size="medium"
              weight="bold"
              truncate
            >
              Not Taken
            </ExtraPadText>
          )}
        </Box>
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
