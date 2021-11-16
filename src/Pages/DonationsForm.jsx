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
      userId: 1,
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
      .then((res) => res.json())
      .then((newDonation) => {
        console.log("Inside POST response", newDonation);
      });
    clearForm();
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      <label htmlFor="amount-input">Amount: £</label>
      <input
        id="amount-input"
        name="amount-input"
        type="text"
        onChange={handleDonationAmountInput}
        value={amount}
        required
      />
      <div className="actions-section">
        <button className="" type="submit">
          Donate
        </button>
      </div>
    </form>
  );
}
