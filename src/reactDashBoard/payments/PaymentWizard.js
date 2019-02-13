import React from "react";
import { Box } from "grommet";
import styled from "styled-components";
import ChooseUser from "./payPages/ChooseUser";
import ExistingUser from "./payPages/ExistingUser";
import CreateUser from "./payPages/CreateUser";
import SingleClass from "./payPages/SingleClass";
import PickClass from "./payPages/PickClass";
import PackageClass from "./payPages/PackageClass";
import ConfirmClass from "./payPages/ConfirmClass";
import Payment from "./payPages/Payment";
import Recipt from "./payPages/Recipt";
import states from "./States";
import StateMachine from "./StateMachine";
import PayWizardContext from "./context";

const Wrapper = styled(Box)`
  width: 95%;
  height: 70vh;
  @media (min-width: 768px) {
    width: 70%;
    height: 70vh;
  }
  @media (min-width: 1168px) {
    height: 70vh;
  }
`;
class PaymentWizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: states.CHOOSEUSER,
    };

    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.stateMachine = new StateMachine();
  }

  next(desiredState) {
    let currentState = this.state.currentState;
    let nextState = this.stateMachine.transitionTo(currentState, desiredState);
    this.setState({
      currentState: nextState,
    });
  }

  back(desiredState) {
    const currentState = this.state.currentState;
    this.setState({
      currentState: this.stateMachine.transitionFrom(
        currentState,
        desiredState,
      ),
    });
  }

  currentStep() {
    const { currentState } = this.state;
    switch (currentState) {
      case states.CHOOSEUSER:
        return <ChooseUser next={this.next} />;
      case states.EXISTINGUSER:
        return <ExistingUser next={this.next} back={this.back} />;
      case states.CREATEUSER:
        return <CreateUser next={this.next} back={this.back} />;
      case states.PICKCLASS:
        return <PickClass next={this.next} back={this.back} />;
      case states.SINGLECLASS:
        return <SingleClass next={this.next} back={this.back} />;
      case states.PACKAGECLASS:
        return <PackageClass next={this.next} back={this.back} />;
      case states.CONFIRM:
        return <ConfirmClass next={this.next} back={this.back} />;
      case states.PAYMENT:
        return <Payment next={this.next} back={this.back} />;
      case states.RECIPT:
        return <Recipt next={this.next} back={this.back} />;
      default:
        return <ChooseUser next={this.next} back={this.back} />;
    }
  }

  render() {
    return (
      <Wrapper>
        <PayWizardContext>{this.currentStep()}</PayWizardContext>
      </Wrapper>
    );
  }
}

export default PaymentWizard;
