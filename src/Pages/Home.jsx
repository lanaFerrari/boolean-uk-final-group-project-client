import { useEffect, useState } from "react";
import Main from "./HomeComponents/Main";

export default function Home({
  projectsToRender,
  categories,
  setProjects,
  donations,
  users,
}) {
  return (
    <>
      <Main
        projectsToRender={projectsToRender}
        categories={categories}
        setProjects={setProjects}
        donations={donations}
        users={users}
      />
    </>
  );
}
