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
  const [categories, setCategories] = useState([]);

  const [hideForm, setHideForm] = useState(true);

  function getProjects() {
    const url = `${process.env.REACT_APP_API_URL}/projects`;
    fetch(url)
      .then((res) => res.json())
      .then((projectsData) => {
        setProjects(projectsData);
      });
  }

  function getUsers() {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    fetch(url)
      .then((res) => res.json())
      .then((usersData) => {
        setUsers(usersData);
      });
  }

  function getCategories() {
    const url = `${process.env.REACT_APP_API_URL}/categories`;
    fetch(url)
      .then((res) => res.json())
      .then((categoriesData) => {
        setCategories(categoriesData);
      });
  }

  useEffect(() => {
    getProjects();
    getUsers();
    getCategories();
  }, []);

  return (
    <>
      <Header projects={projects} setProjects={setProjects} />
      <Switch>
        <Route exact path="/">
          <Home
            projects={projects}
            categories={categories}
            setProjects={setProjects}
          />
        </Route>
        <Route path="/login" exact>
          <LoginForm hideForm={hideForm} setHideForm={setHideForm} />
        </Route>
        <Route exact path="/projects/:id/:title">
          <ProjectDetails />
        </Route>
        <Route path="/:userId/:userName" exact>
          <UserHome />
        </Route>
        <Route path="/:userId/:userName/create-project" exact>
          <UserProjectForm
            categories={categories}
            projects={projects}
            setProjects={setProjects}
            users={users}
            setUsers={setUsers}
          />
        </Route>
        <Route path="/:userId/:userName/myProjects" exact>
          <UserProjects />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
