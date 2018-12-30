import { Component } from "react";
import PropTypes from "prop-types";

/**
 * Resolve
 *
 * This is the workhorse of how Jetty does async.
 * It accepts a promise, and renders one of four render props:
 * - before
 * - pending
 * - then
 * - catch
 *
 * It also passes the `lastSuccessfulValue` to the `catch` and `pending`
 * render props, allowing you to continue to render both the results and
 * a loading indicator, if you so choose.
 *
 * The general pattern for using resolve is as follows:
 * - When the user interacts with the UI, which would trigger a new API call, call:
 * this.setState({
 *   uiState: newUiState,
 *   myPromise: fetchData(newUiState),
 * })
 * (or use StateProvider).
 * - In the render method, do:
 * <Resolve
 *   promise={this.state.myPromise}
 *   then={data => <div>we got data and it is {data}</div>}
 *   // etc
 * />
 * - You do not need to prevent the user from interacting with the UI while the
 *   promise is pending. They can trigger many promises, and only the results of the
 *   last one will render.
 */

const states = {
  UNINITIALIZED: "UNINITIALIZED",
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  CAUGHT: "CAUGHT",
};

const funcOrNode = PropTypes.oneOfType([
  PropTypes.func.isRequired,
  PropTypes.node.isRequired,
]);

export default class Resolve extends Component {
  static propTypes = {
    promise: PropTypes.shape({
      then: PropTypes.func.isRequired,
    }),

    before: funcOrNode,
    pending: funcOrNode,
    then: funcOrNode,
    catch: funcOrNode,
  };

  static LAST_STATES = {
    CAUGHT: states.CAUGHT,
    RESOLVED: states.RESOLVED,
  };

  state = {
    promiseState: states.UNINITIALIZED,
    value: undefined,
    error: undefined,
    lastSuccessfulValue: undefined,
    lastError: undefined,
  };

  componentDidMount() {
    if (this.props.promise) {
      this.handlePromise(this.props.promise);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.promise !== this.props.promise) {
      this.handlePromise(newProps.promise);
    }
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  handlePromise(promise) {
    this.setState({
      promiseState: states.PENDING,
      value: undefined,
      error: undefined,
      promise,
    });

    promise.then(
      value => {
        if (this.state.promise === promise && !this.unmounted) {
          this.setState({
            promiseState: states.RESOLVED,
            value,
            lastSuccessfulValue: value,
            lastState: states.RESOLVED,
          });
        }
      },
      error => {
        if (this.state.promise === promise && !this.unmounted) {
          this.setState({
            promiseState: states.CAUGHT,
            error,
            lastError: error,
            lastState: states.CAUGHT,
          });
        }
      },
    );
  }

  render() {
    const {
      pending,
      then,
      catch: catchHandler, // catch is a reserved word
      before,
    } = this.props;
    const {
      promiseState,
      value,
      error,
      lastSuccessfulValue,
      lastError,
      lastState,
    } = this.state;

    const renderChildFunction = (fnOrNode, ...params) => {
      if (typeof fnOrNode === "function") {
        return fnOrNode(...params);
      } else if (fnOrNode) {
        return fnOrNode;
      }
      return null;
    };

    switch (promiseState) {
      case states.UNINITIALIZED:
        return renderChildFunction(before);
      case states.PENDING:
        return renderChildFunction(
          pending,
          lastSuccessfulValue,
          lastError,
          lastState,
        );
      case states.RESOLVED:
        return renderChildFunction(then, value);
      case states.CAUGHT:
        return renderChildFunction(catchHandler, error, lastSuccessfulValue);
      default:
        throw new Error("Resolve is in an undefined state", promiseState);
    }
  }
}
