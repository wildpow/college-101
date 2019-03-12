import React from "react";
import styled from "styled-components";
import { Box, Calendar, DropButton, Text } from "grommet";
import { FormDown } from "grommet-icons";
import QuerySessions from "../../../../queryComponents/QuerySessions";
import SessionView from "./paySessionView";

const Wrapper = styled.div`
  width: 100%;
`;
class PickClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDateOpen: false,
      startDate: new Date().toISOString(),
    };
  }

  startOnOpen = () => this.setState({ startDateOpen: true });

  startOnClose = () => this.setState({ startDateOpen: false });

  startDateSelect = date => {
    this.setState({ startDate: date, startDateOpen: false });
  };

  render() {
    const { startDateOpen, startDate } = this.state;
    const today = new Date();
    const day =
      today.getDate() >= 9 ? `0${today.getDate()}` : `${today.getDate()}`;
    const month = `${today.getMonth() + 1}`;
    const todayString = `${today.getFullYear()}-${month}-${day}`;
    const futureString = `${today.getFullYear() + 1}-${month}-${day}`;
    const bounds = [todayString, futureString];
    return (
      <Wrapper>
        <DropButton
          open={startDateOpen}
          onClose={this.startOnClose}
          onOpen={this.startOnOpen}
          dropContent={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Calendar
              date={startDate}
              onSelect={this.startDateSelect}
              size="medium"
              bounds={bounds}
            />
          }
        >
          <Box
            direction="row"
            // gap="medium"
            align="center"
            pad="small"
          >
            <Text size="large" weight="bold">
              {`Classes for
              ${
                startDate
                  ? new Date(startDate).toLocaleDateString()
                  : new Date().toLocaleDateString()
              }`}
            </Text>
            <FormDown color="brand" />
          </Box>
        </DropButton>
        <QuerySessions component={SessionView} date={startDate} />
      </Wrapper>
    );
  }
}

export default PickClass;
