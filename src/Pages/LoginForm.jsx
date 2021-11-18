import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";

export default function LoginForm(props) {
  const history = useHistory();
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
        history.push(`/user/${newUser.id}/${newUser.name}`);
      });
    clearForm();
    setHideForm(true);
  };
  return (
    <div className="padding-top padding-bottom">
      <form
        className="center form-stack light-shadow padding-form"
        onSubmit={handleSubmit}
      >
        <h1 className="padding-bottom blue-color align-center">Sign In</h1>
        <label htmlFor="first-name-input ">Full Name:</label>
        <input
          className="input-box "
          id="full-name-input"
          name="full-name-input"
          type="full-name-input"
          onChange={handleUserNameInput}
          value={name}
          required
        />
        <label htmlFor="email-input" className="padding-top">
          E-mail Address:
        </label>
        <input
          className="input-box"
          id="email-input"
          name="email-input"
          type="email-input"
          onChange={handleEmailInput}
          value={email}
          required
        />
        <label htmlFor="country-input" className="padding-top">
          Country:
        </label>
        <input
          className="input-box"
          id="country-input"
          name="country-input"
          type="country-input"
          onChange={handleCountryInput}
          value={country}
          required
        />

        <div className="actions-section padding-top padding-bottom flex-end">
          <button className="button-style" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
