import React, { Component } from "react";
import { Select, Form, FormField, Button } from "grommet";

const OPTIONS = ["First", "Second", "Third"];

export default class extends Component {
  state = { value: [], options: OPTIONS };

  render() {
    const { options, selected, value } = this.state;
    return (
      <Form onSubmit={e => e.preventDefault}>
        <FormField label="Options" required>
          <Select
            multiple={true}
            selected={selected}
            value={value}
            onSearch={searchText => {
              const regexp = new RegExp(searchText, "i");
              this.setState({ options: OPTIONS.filter(o => o.match(regexp)) });
            }}
            onChange={event =>
              this.setState({
                value: event.value,
                selected: event.selected,
                options: OPTIONS,
              })
            }
            options={options}
          />
        </FormField>
        <Button type="submit" label="submit" />
      </Form>
    );
  }
}
