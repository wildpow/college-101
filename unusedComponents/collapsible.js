import React from "react";
import styled from "styled-components";

const Collapsible = styled.button`
  background-color: #777;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
`;

const Content = styled.div`
  padding: 0 18px;
  max-height: ${props => (props.open === "1" ? `${props.newHieght}px` : 0)};
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
`;

const Content2 = styled(Content)`
  max-height: ${props => (props.open === "4" ? `${props.newHieght}px` : 0)};
`;

const Content3 = styled(Content)`
  max-height: ${props => (props.open === "6" ? `${props.newHieght}px` : 0)};
`;
const Content4 = styled(Content)`
  max-height: ${props => (props.open === "8" ? `${props.newHieght}px` : 0)};
`;
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: "0",
      newHieght: 0,
    };
    this.myRef = React.createRef();
    this.stuff = this.stuff.bind(this);
  }

  stuff(event) {
    event.preventDefault();
    if (this.state.open === event.target.id) {
      console.log("true");
      this.setState({
        open: "0",
        // newHieght: this.myRef.current.children[event.target.id].scrollHeight,
      });
      return;
    }
    console.log("false");
    this.setState({
      open: event.target.id,
      newHieght: this.myRef.current.children[event.target.id].scrollHeight,
    });
    console.log("bla", this.state);
    console.log(
      "scroll height",
      this.myRef.current.children[event.target.id].scrollHeight,
    );
  }

  render() {
    return (
      <>
        <h2>Test Prepatation</h2>
        <div ref={this.myRef}>
          <Collapsible onClick={this.stuff} id="1">
            PSAT
          </Collapsible>
          <Content open={this.state.open} newHieght={this.state.newHieght}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            </p>
          </Content>

          <p>SAT</p>
          <Collapsible onClick={this.stuff} id="4">
            ACT
          </Collapsible>
          <Content2 open={this.state.open} newHieght={this.state.newHieght}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Content2>
          <Collapsible onClick={this.stuff} id="6">
            GRE
          </Collapsible>
          <Content3 open={this.state.open} newHieght={this.state.newHieght}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Content3>
          <Collapsible onClick={this.stuff} id="8">
            Subject Exams
          </Collapsible>
          <Content4 open={this.state.open} newHieght={this.state.newHieght}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Content4>
        </div>
      </>
    );
  }
}

export default MyComponent;
