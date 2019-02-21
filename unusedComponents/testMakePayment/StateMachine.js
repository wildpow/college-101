import states from "./States";

class StateMachine {
  constructor() {
    this.transitions = {
      [states.CHOOSEUSER]: [
        states.EXISTINGUSER,
        states.CREATEUSER,
        states.PICKCLASS,
        states.SINGLECLASS,
        states.CONFIRM,
        states.RECIPT,
      ],
      [states.EXISTINGUSER]: [states.CHOOSEUSER, states.PICKCLASS],
      [states.CREATEUSER]: [states.CHOOSEUSER, states.PICKCLASS],
      [states.PICKCLASS]: [
        states.CHOOSEUSER,
        states.SINGLECLASS,
        states.PACKAGECLASS,
      ],
      [states.SINGLECLASS]: [
        states.CHOOSEUSER,
        states.CONFIRM,
        states.PICKCLASS,
      ],
      [states.PACKAGECLASS]: [
        states.CHOOSEUSER,
        states.CONFIRM,
        states.PICKCLASS,
      ],
      [states.CONFIRM]: [
        states.CHOOSEUSER,
        states.PACKAGECLASS,
        states.SINGLECLASS,
        states.PAYMENT,
      ],
      [states.PAYMENT]: [states.CHOOSEUSER, states.CONFIRM, states.RECIPT],
      [states.RECIPT]: [states.CHOOSEUSER],
    };
  }

  _reverseObject(obj) {
    let reversed = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key].forEach(i => {
          if (reversed[i] === undefined) {
            reversed[i] = [key];
          } else {
            reversed[i].push(key);
          }
        });
      }
    }
    return reversed;
  }

  _checkState(available, desired) {
    if (available.includes(desired)) {
      return desired;
    } else {
      throw new Error(`Desired state: ${desired} is not available`);
    }
  }

  transitionTo(current, desired) {
    let available = this.transitions[current].concat();
    return this._checkState(available, desired);
  }

  transitionFrom(current, desired) {
    let reversed = this._reverseObject(this.transitions);
    let available = reversed[current].concat();
    return this._checkState(available, desired);
  }
}

export default StateMachine;
