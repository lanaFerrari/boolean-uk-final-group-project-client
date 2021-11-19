import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function UserProjects({ projects, setProjects }) {
  const history = useHistory();
  const { userId, userName } = useParams();
  const targetUserId = parseInt(userId);

  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${targetUserId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (typeof data === "object" && !Array.isArray(data) && data !== null) {
          setUserProjects(data.response.projects);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [targetUserId]);

  if (userProjects.length === 0) {
    return "no projects";
  }

  const handleDelete = (project) => {
    const targetProjectId = project.id;
    console.log("Project to delete: ", project);
    fetch(`${process.env.REACT_APP_API_URL}/projects/${targetProjectId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        const updatedProjects = projects.filter(
          (project) => project.id !== targetProjectId
        );
        setProjects(updatedProjects);
        history.push(`/user/${userId}/${userName}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="adding-height  align-center">
      <h1 className="padding-top blue-color">{userName} projects</h1>
      {userProjects.map((project, index) => {
        return (
          <div className="responsive-grid">
            <div key={index}>
              <div className="align-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="project placeholder"
                />
              </div>
              <h3 className="align-center padding-top">{project.title}</h3>
              <div className="two-c-grid">
                <div className="actions-section padding-top padding-bottom flex-end">
                  <button
                    className="button-style"
                    type="button"
                    onClick={() => {
                      history.push(
                        `/user/${project.userId}/${userName}/${project.id}/edit-project`
                      );
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="actions-section padding-top padding-bottom flex-end gap">
                  <button
                    className="button-style"
                    type="button"
                    onClick={() => handleDelete(project)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
