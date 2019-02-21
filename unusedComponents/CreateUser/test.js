import React from "react";
import styled, { css } from "styled-components";
import "./test.css";

const FieldActivate = css`
  transform: translateY(-25px);
  font-size: 0.9em;
  color: #000;
  text-shadow: 1px 0 0 #fff, -1px 0 0 #fff, 2px 0 0 #fff, -2px 0 0 #fff,
    0 1px 0 #fff, 0 -1px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff;
`;

const Label = styled.label`
  display: inline-block;
  position: absolute;
  left: 15px;
  top: 16px;
  transition: all 150ms ease-in;
  color: #676767;
  ${props => (props.fieldActive ? { FieldActivate } : "")}
`;

const Input = styled.input`
  :placeholder-shown {
    border: 4px solid black;
  }
`;
class Tester extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      fieldActive: false,
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.activateField = this.activateField.bind(this);
    this.disableFocus = this.disableFocus.bind(this);
  }

  activateField() {
    this.setState({
      fieldActivate: false,
    });
  }

  disableFocus(e) {
    if (e.target.value === "") {
      this.setState({
        fieldActivate: false,
      });
    }
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
    this.activateField(e);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        {/* <form>
          <h1>Poop</h1>
          <div className="field-group">
            <label className={this.state.fieldActive ? "field-active" : ""}>
              Name
            </label>
            <Input
              placeHolder="poop"
              className="floating-label"
              type="text"
              value={this.state.inputValue}
              onFocus={this.activateField}
              onBlur={this.disableField}
              onChange={this.updateInputValue}
            />
          </div>
        </form> */}
        <form action="">
          <div class="field">
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={this.state.inputValue}
              onChange={this.updateInputValue}
              placeholder="Jane Appleseed"
            />
            <label for="fullname">Name</label>
          </div>

          <div class="field">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="jane.appleseed@example.com"
            />
            <label for="email">Email</label>
          </div>
        </form>
      </div>
    );
  }
}

export default Tester;
