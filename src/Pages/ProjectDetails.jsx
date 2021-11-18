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
      .then((res) => res.json())
      .then((projectData) => {
        setProject(projectData);
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
      <div className="align-center padding-top padding-bottom">
        <h1 className="padding-bottom padding-top boolean-green">
          {projectTitle}
        </h1>
        <div className="project_details">
          <img
            src="https://via.placeholder.com/200"
            alt="project placeholder"
          />
          <h3 className="padding-top">{description}</h3>
          <p>
            <strong>{name}</strong> - {country}
          </p>
        </div>
        <div className="donation_details">
          <p className="padding-bottom padding-top">
            --------loader---------------
          </p>
          <p>
            <strong className="blue-color">Donated:</strong> £{totalDonations}
          </p>
          <p className="padding-bottom">
            <strong className="blue-color">Goal:</strong> £{goal}
          </p>
          <div className="align-center">
            <button
              className="button-style"
              type="button"
              onClick={() =>
                history.push(`/project/${targetId}/${title}/donation`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
