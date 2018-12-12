import React from "react";
import styled from "styled-components";
import Modal from "./portal";
import QueryTeacherCourse from "../../queryComponents/all_Teachers_Courses";
import CreateTeacher from "../createTeacher";

const Button = styled.button`
  display: flex;
  justify-content: center;
  padding: 0.5em 3em;
  border: 0.16em solid green;
  /* margin-right: 10px; */
  margin-top: 10px;
  text-decoration: none;
  text-transform: uppercase;
  font-family: Verdana, sans-serif;
  font-weight: 400;
  color: black;
  text-align: center;
  transition: all 0.15s;
  background: transparent;
  outline: none;
  cursor: pointer;
  &:hover {
    color: #dddddd;
    border-color: #dddddd;
  }
  &:active {
    color: #bbbbbb;
    border-color: #bbbbbb;
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  font-family: Verdana, sans-serif;
  font-variant: small-caps;
  letter-spacing: 4px;
  background-color: seagreen;
  color: floralwhite;
  h3 {
    padding: 15px 15px 15px 15px;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    margin: 0;
  }
  button {
    background-color: seagreen;
    position: absolute;
    overflow: hidden;
    border: 0;
    color: white;
    outline: none;
    top: 0.1rem;
    right: 0.3rem;
    padding: 0.3rem;
    font-size: 2.2em;
    height: 1em;
    width: 1.3em;
    text-indent: 10em;
    cursor: pointer;
    transition: all ease 0.3s;
    &:hover {
      color: black;
    }
    &::after {
      position: absolute;
      line-height: 0.5;
      top: 0.45em;
      left: 0.5em;
      text-indent: 0;
      content: "\00D7";
      @media (min-width: 768px) and (min-height: 823px) and (orientation: portrait) {
        top: 0.35em;
        left: 0.45em;
      }
      @media (min-width: 1024px) {
        top: 0.35em;
        left: 0.45em;
      }
    }
  }
`;

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      flipCard: "",
    };
    this.handleHide = this.handleHide.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({
      showModal: false,
    });
  }
  handleFlip() {
    this.setState({ flipCard: "rotateY(180deg)" });
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <ModalContainer>
          <Card>
            <Header>
              <h3>add teacher</h3>
              <button onClick={this.handleHide}>close</button>
            </Header>
            <QueryTeacherCourse component={CreateTeacher} />
          </Card>
        </ModalContainer>
      </Modal>
    ) : null;
    return (
      <div>
        <Button type="button" onClick={this.handleShow}>
          Create Teacher
        </Button>
        {modal}
      </div>
    );
  }
}

export default AddTeacher;
