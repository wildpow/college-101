import React from "react";
import PropTypes from "prop-types";
import { Normalize } from "styled-normalize";
import styled from "styled-components";
import NavBar from "./navbar/navbar";
import MobileNav from "./mobileMenu/mobileNav";

const Wrapper = styled.div`
  margin-top: 55px;
`;
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: false,
    };
    this.handleActiveButton = this.handleActiveButton.bind(this);
    this.handleHomeButton = this.handleHomeButton.bind(this);
  }

  handleActiveButton() {
    const { activeButton } = this.state;
    this.setState({
      activeButton: !activeButton,
    });
  }

  handleHomeButton() {
    const { activeButton } = this.state;
    if (activeButton) {
      this.setState({
        activeButton: !activeButton,
      });
    }
  }

  render() {
    const { activeButton } = this.state;
    const { children } = this.props;
    return (
      <>
        <Normalize /> {/* CSS reset  */}
        <NavBar
          activeButton={activeButton}
          handleActiveButton={this.handleActiveButton}
          handleHomeButton={this.handleHomeButton}
        />
        <MobileNav
          activeButton={activeButton}
          handleActiveButton={this.handleActiveButton}
        />
        <Wrapper>{children}</Wrapper>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
