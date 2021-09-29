import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

import {
  getProductsTotal,
  getNumberCartItems,
  getTotalPrice,
  getCart,
} from "../store/selectors";

const elemOptions = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Checkout = () => {
  const dispatch = useDispatch();

  const totalPrice = useSelector(getTotalPrice, shallowEqual);
  const numberCartItems = useSelector(getNumberCartItems, shallowEqual);
  const cart = useSelector(getCart, shallowEqual);

  console.log(cart);

  const elements = useElements();
  const stripe = useStripe();

  const router = useRouter();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = async (ev) => {
    // Block native form submission.
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      /* email: ev.target.email.value, */
    };

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    try {
      const { data: clientSecret } = await axios.post(
        "http://localhost:5000/api/payment_intents",
        {
          amount: totalPrice * 100,
        }
      );

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardNumberElement);

      // Use your card Element with other Stripe.js APIs

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        console.log("[error]", error);
      } else {
        router.push({
          pathname: "/",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Page>
      <Link href="/">
        <Text>HOME</Text>
      </Link>
      <div>CHECKOUT</div>
      <div>TOTAL PRICE:</div>
      <div>{totalPrice}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          required
          placeholder="João Ninguém"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="cardNumber">Card Number</label>
        <CardNumberElementStyled id="cardNumber" options={elemOptions} />

        <label htmlFor="expiry">Card Expiration</label>
        <CardExpiryElement id="expiry" options={elemOptions} />

        <label htmlFor="cvc">CVC</label>
        <CardCvcElement id="cvc" options={elemOptions} />

        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Page>
  );
};

export default Checkout;

const Page = styled(animated.div)`
  width: 100%;
  color: hsla(327, 100%, 19%, 1);
  position: relative;
`;

const Text = styled(animated.a)`
  width: 100px;
  height: 100px;

  color: hsla(327, 100%, 19%, 1);
  cursor: pointer;
`;

const CardNumberElementStyled = styled(CardNumberElement)`
  width: 200px;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: inset 5px 5px 5px grey;
  text-shadow: 10px 10px 1px black;
  padding: 5px;

  :before {
    content: "";
    position: absolute;
    display: block;
  }
`;
