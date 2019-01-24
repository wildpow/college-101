import React, { Component } from "react";
import { Calendar } from "grommet";

class SimpleCalendar extends Component {
  state = {
    date: new Date().toLocaleDateString(),
  };

  onSelect = nextDate => {
    const { date } = this.state;
    this.setState({ date: nextDate !== date ? nextDate : undefined });
  };

  render() {
    const { date } = this.state;
    return <Calendar date={date} onSelect={this.onSelect} size="medium" />;
  }
}

export default SimpleCalendar;
