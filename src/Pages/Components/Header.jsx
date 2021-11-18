import { useState } from "react";

export default function Header({ searchInput, setSearchInput }) {
  const handleSearchInput = (e) => setSearchInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="three-c-grid centering center-text ">
      <div className="three-c-grid ">
        {" "}
        <p>
          <a href="/login" className="boolean-blue">
            Create Project
          </a>
        </p>
        <p>
          <a href="/login" className="boolean-blue align-center">
            Log in
          </a>
        </p>
      </div>
      <div>
        <a
          href="https://boolean.co.uk"
          target="_blank"
          rel="noreferrer"
          className="align-center"
        >
          <img
            src="https://boolean.co.uk/images/misc/logo.png"
            alt="Boolean"
            width="130px"
          />
        </a>
      </div>
      <div className="two-c-grid">
        <p></p>

        <form onSubmit={handleSubmit}>
          <input type="submit" name="submit" value="🔎︎" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInput}
            className="boolean-blue"
          />
        </form>
      </div>
    </header>
  );
}
