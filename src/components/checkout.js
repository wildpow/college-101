import React from "react";
import uuid from "uuid/v4";
// hardcoded amount (in US cents) to charge users
// you could set this variable dynamically to charge different amounts
const amount = 11100;
const description = "Product Description";
const name = "College 101";
const cardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "3rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "400px",
};
const buttonStyles = {
  fontSize: "13px",
  textAlign: "center",
  color: "#fff",
  outline: "none",
  padding: "12px 60px",
  boxShadow: "2px 5px 10px rgba(0,0,0,.1)",
  backgroundColor: "rgb(255, 178, 56)",
  borderRadius: "6px",
  letterSpacing: "1.5px",
};

// Below is where the checkout component is defined.
// It has several functions and some default state variables.
class Checkout extends React.Component {
  state = {
    disabled: false,
    buttonText: "BUY NOW",
    paymentMessage: "",
    isHidden: false,
  };

  componentDidMount() {
    const { GATSBY_PK } = process.env;
    this.stripeHandler = window.StripeCheckout.configure({
      // You’ll need to add your own Stripe public key to Netlify env keys.
      // Also your local .env file
      // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
      key: GATSBY_PK,
      closed: () => {
        // this.resetButton();
      },
    });
  }

  resetButton = () => {
    this.setState({
      disabled: false,
      buttonText: "BUY NOW",
      isHidden: false,
      paymentMessage: "",
    });
  };

  openStripeCheckout(event) {
    event.preventDefault();
    const idempotency_key = uuid();

    this.setState({ disabled: true, buttonText: "WAITING..." });
    this.stripeHandler.open({
      name: name,
      amount: amount,
      description: description,
      billingAddress: true,
      token: token => {
        fetch(
          "https://bigtony--college101prep.netlify.com/.netlify/functions/purchase",
          {
            method: "POST",
            // mode: "cors",
            body: JSON.stringify({
              token,
              amount,
              description,
              idempotency_key: idempotency_key,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          },
        )
          .then(res => {
            console.log("res= ", res, " res.json()", res.body);
            if (res.status != 404) {
              this.setState({
                isHidden: true,
                paymentMessage: "Payment Successful!",
              });
            } else {
              this.setState({
                isHidden: true,
                paymentMessage: "Trouble proccessing",
              });
            }

            //setTimeout(this.resetButton, 5000)
            setTimeout(() => {
              this.setState({
                disabled: false,
                buttonText: "BUY NOW",
                isHidden: false,
                paymentMessage: "",
              });
            }, 3000);

            return res;
          })
          .catch(error => {
            console.error("Error:", error);
            this.setState({ paymentMessage: "Payment Failed" });
          });
      },
    });
  }

  render() {
    const { buttonText, disabled, isHidden, paymentMessage } = this.state;
    return (
      <div style={cardStyles}>
        <h4>Spend your Money!</h4>
        <p>
          Use any email, 4242 4242 4242 4242 as the credit card number, any 3
          digit number, and any future date of expiration.
        </p>
        {!isHidden && (
          <button
            style={buttonStyles}
            onClick={event => this.openStripeCheckout(event)}
            disabled={disabled}
            type="button"
          >
            {buttonText}
          </button>
        )}
        {paymentMessage}
      </div>
    );
  }
}

export default Checkout;
