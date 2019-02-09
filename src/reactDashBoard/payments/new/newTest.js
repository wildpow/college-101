import React from "react";
import { Box } from "grommet";
import ChooseUser from "./ChooseUser";
import ExistingUser from "./ExistingUser";
import CreateUser from "./CreateUser";
import SingleClass from "./SingleClass";
import PickClass from "./PickClass";
import PackageClass from "./PackageClass";
import ConfirmClass from "./ConfirmClass";
import Payment from "./Payment";
import Recipt from "./Recipt";
import states from "./States";
import StateMachine from "./StateMachine";

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
      <Box width="70vw" height="70vh">
        {this.currentStep()}
      </Box>
    );
  }
}

export default PaymentWizard;
