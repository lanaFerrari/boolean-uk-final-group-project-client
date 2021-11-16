import { useEffect, useState } from "react";
import Main from "./HomeComponents/Main";

export default function Home({ projectsToRender, categories, setProjects }) {
  return (
    <>
      <Main
        projectsToRender={projectsToRender}
        categories={categories}
        setProjects={setProjects}
      />
    </>
  );
}
