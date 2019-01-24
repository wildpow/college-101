import React from "react";
import styled from "styled-components";
// import PropTypes from "prop-types";
import Modal from "../../../components/buttons/modal";
import { Button } from "../../../components/sharedStyles";
import CreateAttendance from "./createAttendance";

const Card = styled.div`
  position: absolute;
  width: 400px;
  height: 650px;
  transform-style: preserve-3d;
  transition: all 0.5s ease;
`;
const NewButton = styled(Button)`
  margin-top: 0;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  font-family: Verdana, sans-serif;
  font-variant: small-caps;
  letter-spacing: 4px;
  background-color: seagreen;
  color: floralwhite;
  h3 {
    padding: 15px 15px 15px 15px;
    font-size: 1.6rem;
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
    right: 0.93rem;
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

export const Front = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
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

export const Back = styled.div`
  position: absolute;
  cursor: pointer;
  width: 100%;
  z-index: 1000;
  height: 100%;
  backface-visibility: hidden;
  background: #ffffff;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  font-family: Verdana, sans-serif;
`;

class TakeAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      flipCard: "",
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleFlip = this.handleFlip.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({
      showModal: false,
      flipCard: "",
    });
  }

  handleFlip() {
    this.setState({ flipCard: "rotateY(180deg)" });
  }

  render() {
    const { session, teacher } = this.props;
    const { showModal, flipCard } = this.state;
    const modal = showModal ? (
      <Modal>
        <ModalContainer>
          <Card
            style={{
              transform: flipCard,
              WebkitTransform: flipCard,
            }}
          >
            <Front>
              <Header>
                <h3>Take Attendance</h3>
                <button type="button" onClick={this.handleHide}>
                  close
                </button>
              </Header>
              <CreateAttendance
                handleFlip={this.handleFlip}
                session={session}
                teacher={teacher}
              />
            </Front>

            <Back onClick={this.handleHide}>Success!!!!!!</Back>
          </Card>
        </ModalContainer>
      </Modal>
    ) : null;
    return (
      <>
        <div>
          {session.attendance ? (
            <button type="button">view</button>
          ) : (
            <NewButton onClick={this.handleShow} type="button">
              Take Attendance
            </NewButton>
          )}
        </div>
        {modal}
      </>
    );
  }
}

export default TakeAttendance;
