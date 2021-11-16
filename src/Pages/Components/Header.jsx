import { useState } from "react";

export default function Header({ searchInput, setSearchInput }) {
  const handleSearchInput = (e) => setSearchInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header>
      <p>
        <a href="/login">Create Project</a>
      </p>
      <p>
        <a href="https://boolean.co.uk" target="_blank" rel="noreferrer">
          Boolean
        </a>
      </p>
      <p>
        <a href="/login">Log in</a>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <input type="submit" name="submit" value="Search" />
      </form>
    </header>
  );
}
