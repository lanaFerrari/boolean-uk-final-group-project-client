import { useEffect, useState } from "react";
import Main from "./HomeComponents/Main";

export default function Home({ projects }) {
  return (
    <>
      <Main projects={projects} />
    </>
  );
}
