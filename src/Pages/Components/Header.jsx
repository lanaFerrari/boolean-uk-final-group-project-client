import { useState } from "react";

export default function Header({ projects, setProjects }) {
  const [searchInput, setSearchInput] = useState("");
  console.log("searchinput", searchInput.replace(/\s+/g, "-").toLowerCase());

  const handleSearchInput = (e) => setSearchInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newList = projects.filter(
      (project) =>
        project.title.replace(/\s+/g, "-").toLowerCase() ===
        searchInput.replace(/\s+/g, "-").toLowerCase()
    );
    setProjects(newList);
  };

  return (
    <header>
      <p>
        <a href="/login">Create Project</a>
      </p>
      <p>
        <a href="https://boolean.co.uk" target="_blank">
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
