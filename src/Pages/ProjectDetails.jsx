import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function ProjectDetails() {
  const history = useHistory();
  const { id, title } = useParams();
  const tragetId = +id;
  const [project, setProject] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/projects/${tragetId}`;
    fetch(url)
      .then((res) => res.json())
      .then((projectData) => {
        setProject(projectData);
      });
  }, [tragetId]);

  if (project === null) {
    return "loading";
  }

  if (project.title !== title) {
    history.push(`/projects/${id}/${project.title}`);
  }

  const { title: projectTitle, description, goal, user, donations } = project;
  const { name, profile } = user;
  const { country } = profile;

  const countDonations = (donations) => {
    return donations.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
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
        <button type="button" onClick={() => history.push("/login")}>
          Donate
        </button>
      </div>
    </>
  );
}
