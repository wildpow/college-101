import React, { createRef, Component } from "react";
import styled from "styled-components";
import { Box, Button, Drop } from "grommet";

const Wrapper = styled.div`
  justify-content: center;
  display: flex;
`;
class ProgressiveDrop extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      start: true,
      drop1: false,
      drop2: false,
      drop3: false,
      drop4: false,
      drop5: false,
    };
  }

  // componentDidMount() {
  //   const targetRef = createRef();
  //   this.setState({
  //     reff: targetRef,
  //   });
  // }

  render() {
    const { drop1, drop2, drop3, drop4, drop5, start } = this.state;
    return (
      <Wrapper ref={this.container} className="poop ppoioopy1">
        <Drop ref={this.container.current}>
          <Box elevation="large">
            {start && (
              <Box
                className="poop ppoioopy1"
                width="700px"
                height="500px"
                elevation="large"
                background="purple"
                // ref={this.boxRef}
              >
                <h1>Step 1</h1>
                <Button
                  primary
                  label="drop1"
                  onClick={() =>
                    this.setState({
                      start: false,
                      drop1: true,
                      drop2: false,
                      drop3: false,
                      drop4: false,
                      drop5: false,
                    })
                  }
                />
              </Box>
            )}
            {console.log(this.boxRef)}
            {drop1 && (
              <Box
                animation="slideRight"
                width="700px"
                height="500px"
                elevation="large"
                background="pink"
              >
                <h1>Step 2</h1>
                <Button
                  primary
                  label="drop2"
                  onClick={() =>
                    this.setState({
                      start: false,
                      drop1: false,
                      drop2: true,
                      drop3: false,
                      drop4: false,
                      drop5: false,
                    })
                  }
                />
              </Box>
            )}
            {drop2 && (
              <Box
                animation="slideRight"
                width="700px"
                height="500px"
                elevation="large"
                background="grey"
              >
                <h1>Step 3</h1>
                <Button
                  primary
                  label="drop3"
                  onClick={() =>
                    this.setState({
                      start: false,
                      drop1: false,
                      drop2: false,
                      drop3: true,
                      drop4: false,
                      drop5: false,
                    })
                  }
                />
              </Box>
            )}
            {drop3 && (
              <Box
                animation="slideRight"
                width="700px"
                height="500px"
                elevation="large"
                background="green"
              >
                <h1>Step 4</h1>
                <Button
                  primary
                  label="drop4"
                  onClick={() =>
                    this.setState({
                      start: false,
                      drop1: false,
                      drop2: false,
                      drop3: false,
                      drop4: true,
                      drop5: false,
                    })
                  }
                />
              </Box>
            )}
            {drop4 && (
              <Box
                animation="slideRight"
                width="700px"
                height="500px"
                elevation="large"
                background="brown"
              >
                <h1>Step 5</h1>
                <Button
                  primary
                  label="drop5"
                  onClick={() =>
                    this.setState({
                      start: false,
                      drop1: false,
                      drop2: false,
                      drop3: false,
                      drop4: false,
                      drop5: true,
                    })
                  }
                />
              </Box>
            )}
            {drop5 && (
              <Box
                animation="slideRight"
                width="700px"
                height="500px"
                elevation="large"
                background="red"
              >
                <h1>Step 5</h1>
                <Button
                  primary
                  label="drop5"
                  onClick={() =>
                    this.setState({
                      start: false,
                      drop1: false,
                      drop2: false,
                      drop3: false,
                      drop4: false,
                      drop5: true,
                    })
                  }
                />
              </Box>
            )}
          </Box>
        </Drop>
      </Wrapper>
    );
  }
}

export default ProgressiveDrop;
