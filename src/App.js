import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import LoginForm from "./Pages/LoginForm";
import ProjectDetails from "./Pages/ProjectDetails";
import UserHome from "./Pages/UserHome";
import UserProjectForm from "./Pages/UserProjectForm";
import UserProjects from "./Pages/UserProjects";
import Header from "./Pages/Components/Header";
import Footer from "./Pages/Components/Footer";

function App() {
  //Saving projects data
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  //Get all projects
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/projects`;
    fetch(url)
      .then((res) => res.json())
      .then((Data) => {
        setProjects(Data);
      });
  }, []);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    fetch(url)
      .then((res) => res.json())
      .then((usersData) => {
        setUsers(usersData);
      });
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home projects={projects} />
        </Route>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route exact path="/projects/:id/:title">
          <ProjectDetails />
        </Route>
        <Route path="/:userName" exact>
          <UserHome />
        </Route>
        <Route path="/:userName/create-project" exact>
          <UserProjectForm />
        </Route>
        <Route path="/:userName/myProjects" exact>
          <UserProjects />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
