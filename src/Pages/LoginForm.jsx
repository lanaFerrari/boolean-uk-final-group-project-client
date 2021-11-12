import React from "react";
import { useState } from "react";

export default function LoginForm(props) {
  const { setHideForm } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const clearForm = () => {
    setName("");
    setEmail("");
    setCountry("");
  };
  const handleUserNameInput = (e) => {
    setName(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handleCountryInput = (e) => {
    setCountry(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const userDetails = {
      name: name,
      profile: { email: email, country: country },
    };

    const fetchOptionsUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    fetch("http://localhost:3030/users", fetchOptionsUser)
      .then((res) => res.json())
      .then((newUser) => {
        console.log("inside POST response: ", newUser);
      });
    clearForm();
    setHideForm(true);
  };
  return (
    <form className="center form-stack light-shadow" onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <label htmlFor="first-name-input">Full Name:</label>
      <input
        id="full-name-input"
        name="full-name-input"
        type="text"
        onChange={handleUserNameInput}
        value={name}
        required
      />
      <label htmlFor="email-input">E-mail Address:</label>
      <input
        id="email-input"
        name="email-input"
        type="email"
        onChange={handleEmailInput}
        value={email}
        required
      />
      <label htmlFor="country-input">Country:</label>
      <input
        id="country-input"
        name="country-input"
        type="text"
        onChange={handleCountryInput}
        value={country}
        required
      />

      <div className="actions-section">
        <button className="" type="submit">
          Log In
        </button>
      </div>
    </form>
  );
}
