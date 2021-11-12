import { useEffect, useState } from "react";
import Main from "./HomeComponents/Main";

export default function Home({ projects, categories, setProjects }) {
  return (
    <>
      <Main
        projects={projects}
        categories={categories}
        setProjects={setProjects}
      />
    </>
  );
}
