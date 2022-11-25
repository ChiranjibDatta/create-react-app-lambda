import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Lv0QxC02MC3RZD3rN8bV5w1yx3Q2S2sOPpW5fly2oyQP4HhSOCguWxi3MDewhb5Pz7vQeXJ3CSZc4EyOEU7fL8b00YkUdbaw8");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/stripe/createPaymentIntent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  "productId": "F2P-256911100",
                        "currency": "usd",
                        "tipAmount": "21",
                        "customer": {
                            "name": "customerName",
                            "phoneNumber": "+15104589668",
                        }}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.payload));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}