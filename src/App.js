import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import LoginForm from "./Pages/Login Form";
import ProjectDetails from "./Pages/Project Details";
import UserHome from "./Pages/User Home";
import UserProjectForm from "./Pages/User Prjct Form";
import UserProjects from "./Pages/User Projects";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login" exact>
        <LoginForm />
      </Route>
      <Route exact path="/project/:id/:name">
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
  );
}

export default App;
