import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function ProjectDetails() {
  const history = useHistory();
  const { id, title } = useParams();
  const targetId = +id;
  const [project, setProject] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/projects/${targetId}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((projectData) => {
        if (
          typeof projectData === "object" &&
          !Array.isArray(projectData) &&
          projectData !== null
        ) {
          setProject(projectData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [targetId]);

  if (project === null) {
    return "loading";
  }

  if (project.title !== title) {
    history.push(`/project/${id}/${project.title}`);
  }

  const { title: projectTitle, description, goal, user, donations } = project;
  const { name, profile } = user;
  const { country } = profile;

  const countDonations = (donations) => {
    return donations.reduce((total, current) => total + current.amount, 0);
  };

  const totalDonations = countDonations(donations);

  return (
    <>
      <h1>{projectTitle}</h1>
      <div className="project_details">
        <img src="https://via.placeholder.com/200" alt="project placeholder" />
        <h3>{description}</h3>
        <p>
          <strong>{name}</strong> - {country}
        </p>
      </div>
      <div className="donation_details">
        <p>--------loader---------------</p>
        <p>
          <strong>Donated:</strong> £{totalDonations}
        </p>
        <p>
          <strong>Goal:</strong> £{goal}
        </p>
        <button
          type="button"
          onClick={() => history.push(`/project/${targetId}/${title}/donation`)}
        >
          Donate
        </button>
      </div>
    </>
  );
}
