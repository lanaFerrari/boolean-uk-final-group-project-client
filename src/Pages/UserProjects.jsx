import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function UserProjects({ projects, setProjects }) {
  const history = useHistory();
  const { userId, userName } = useParams();
  const targetUserId = parseInt(userId);

  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${targetUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserProjects(data.response.projects);
      });
  }, [targetUserId]);

  if (userProjects.length === 0) {
    return "no projects";
  }

  const handleDelete = (project) => {
    const targetProjectId = project.id;

    fetch(`${process.env.REACT_APP_API_URL}/projects/${targetProjectId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedProjects = projects.filter(
          (project) => project.id !== targetProjectId
        );
        setProjects(updatedProjects);

        history.push(`/user/${userId}/${userName}`);
      });
  };

  return (
    <>
      <h1>{userName} projects</h1>
      {userProjects.map((project, index) => {
        return (
          <div key={index}>
            <img
              src="https://via.placeholder.com/150"
              alt="project placeholder"
            />
            <h3>{project.title}</h3>
            <div>
              <button
                type="button"
                onClick={() => {
                  history.push(
                    `/user/${project.userId}/${userName}/${project.id}/edit-project`
                  );
                }}
              >
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(project)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
