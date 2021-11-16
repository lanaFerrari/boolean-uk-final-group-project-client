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
import EditProjectForm from "./Pages/EditProjectForm";

function App() {
  //Saving projects data
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [hideForm, setHideForm] = useState(true);

  const projectsToRender = getProjectsToRender(projects, searchInput);

  function getProjectsToRender(projects, searchInput) {
    if (searchInput === "") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.title
          .replace(/\s+/g, "-")
          .toLowerCase()
          .includes(searchInput) ||
        project.user.name
          .replace(/\s+/g, "-")
          .toLowerCase()
          .includes(searchInput)
    );
  }

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
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <Switch>
        <Route exact path="/">
          <Home
            projectsToRender={projectsToRender}
            categories={categories}
            setProjects={setProjects}
          />
        </Route>
        <Route path="/login" exact>
          <LoginForm hideForm={hideForm} setHideForm={setHideForm} />
        </Route>
        <Route exact path="/project/:id/:title">
          <ProjectDetails />
        </Route>
        <Route path="/user/:userId/:userName" exact>
          <UserHome />
        </Route>
        <Route path="/user/:userId/:userName/create-project" exact>
          <UserProjectForm
            categories={categories}
            projects={projects}
            setProjects={setProjects}
            users={users}
            setUsers={setUsers}
          />
        </Route>
        <Route exact path="/user/:userId/:userName/:projectId/edit-project">
          <EditProjectForm />
        </Route>
        <Route path="/user/:userId/:userName/myProjects" exact>
          <UserProjects />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
