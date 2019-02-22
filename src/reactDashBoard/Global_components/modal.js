import React from "react";
import ReactDOM from "react-dom";

let modalRoot;
let mainRoot;
if (typeof document !== "undefined") {
  modalRoot = document.getElementById("modal-root");
  mainRoot = document.getElementById("___gatsby");
} else {
  modalRoot = "";
  mainRoot = "";
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div"); // holder for the portal
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    document.body.style.overflow = "hidden"; // make backgroup not scrollable
    mainRoot.style.position = "fixed";
    mainRoot.style.filter = "blur(5px) grayscale(50%)";
    mainRoot.style.width = "100%";
    mainRoot.style.height = "100%";
    mainRoot.style.transition = ".35s";
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    document.body.style.overflow = "visible";
    mainRoot.style.position = "static";
    mainRoot.style.filter = "blur(0px) grayscale(0%)";
    mainRoot.style.width = "auto";
    mainRoot.style.height = "auto";
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Modal;
