import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function UserProjects() {
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

  /* TODO: pass handler function on delete button and test handleDelete 
  after controller on server side  will be created */

  // const handleDelete = (project) => {
  //   const id = project.id;
  //   console.log("Project to delete: ", project);
  //   fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       const updatedProjects = userProjects.filter(
  //         (project) => project.id !== id
  //       );
  //       setUserProjects(updatedProjects);

  //       history.push(`/${project.userId}/${userName}/`);
  //     });
  // };

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
                    onClick={() => {
                      // pass handleDelete here
                    }}
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
