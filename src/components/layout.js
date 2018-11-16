import React from "react";
import PropTypes from "prop-types";
import { Normalize } from "styled-normalize";
import styled from "styled-components";
import NavBar from "./navbar";
import MobileNav from "./mobileMenu/mobileNav";
const Wrapper = styled.div`
  padding-top: 55px;
`;
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: false,
    };
    this.handleActiveButton = this.handleActiveButton.bind(this);
  }

  handleActiveButton() {
    console.log("hello from layout handleActiveButton", this.state);
    this.setState({
      activeButton: !this.state.activeButton,
    });
  }

  render() {
    return (
      <>
        <Normalize /> {/* CSS reset  */}
        <NavBar
          activeButton={this.state.activeButton}
          handleActiveButton={this.handleActiveButton}
        />
        <MobileNav
          activeButton={this.state.activeButton}
          handleActiveButton={this.handleActiveButton}
        />
        <Wrapper>{this.props.children}</Wrapper>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
