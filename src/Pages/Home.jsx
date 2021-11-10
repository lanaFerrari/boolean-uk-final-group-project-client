import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";

export default function Home(props) {
  const { projects } = props;

  return (
    <>
      <Header />
      <Main projects={projects} />
    </>
  );
}
