import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function DonationsForm() {
  const history = useHistory();
  const { id, title } = useParams();
  const targetId = parseInt(id);
  const [amount, setAmount] = useState("");

  const clearForm = () => {
    setAmount("");
  };

  const handleDonationAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const donationDetails = {
      amount: amount,
      userId: 27,
      projectId: targetId,
    };

    const fetchOptionsDonation = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationDetails),
    };

    fetch(`${process.env.REACT_APP_API_URL}/donations`, fetchOptionsDonation)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((newDonation) => {
        if (
          typeof newDonation === "object" &&
          !Array.isArray(newDonation) &&
          newDonation !== null
        )
          console.log("Inside POST response", newDonation);
      })
      .catch((error) => {
        console.error(error);
      });
    clearForm();
  };
  return (
    <div className="adding-height  align-center">
      <form
        className="center form-stack light-shadow padding-form"
        onSubmit={handleSubmit}
      >
        <h1 className="padding-bottom blue-color align-center">
          Make your donation
        </h1>
        <label htmlFor="amount-input">Amount: £</label>
        <input
          className="input-box"
          id="amount-input"
          name="amount-input"
          type="amount-input"
          onChange={handleDonationAmountInput}
          value={amount}
          required
        />
        <div className="actions-section padding-top padding-bottom flex-end">
          <button className="button-style" type="submit">
            Donate
          </button>
        </div>
      </form>
    </div>
  );
}
