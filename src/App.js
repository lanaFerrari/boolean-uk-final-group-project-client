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
import DonationsForm from "./Pages/DonationsForm";

function App() {
  //Saving projects data
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [donations, setDonations] = useState([]);
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

  /*
  Response error handling resources:
   => https://developer.mozilla.org/en-US/docs/Web/API/fetch#examples
   => https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  */

  function getProjects() {
    const url = `${process.env.REACT_APP_API_URL}/projects`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((projectsData) => {
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getUsers() {
    const url = `${process.env.REACT_APP_API_URL}/users`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((usersData) => {
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getCategories() {
    const url = `${process.env.REACT_APP_API_URL}/categories`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((categoriesData) => {
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getDonations() {
    const url = `${process.env.REACT_APP_API_URL}/donations`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((donationsData) => {
        if (Array.isArray(donationsData)) {
          setDonations(donationsData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getProjects();
    getUsers();
    getCategories();
    getDonations();
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
            donations={donations}
            users={users}
          />
        </Route>
        <Route path="/login" exact>
          <LoginForm hideForm={hideForm} setHideForm={setHideForm} />
        </Route>
        <Route exact path="/project/:id/:title">
          <ProjectDetails />
        </Route>
        <Route exact path="/project/:id/:title/donation">
          <DonationsForm />
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
          <EditProjectForm categories={categories} />
        </Route>
        <Route path="/user/:userId/:userName/myProjects" exact>
          <UserProjects projects={projects} setProjects={setProjects} />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
