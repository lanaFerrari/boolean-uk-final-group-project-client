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
              <button
                type="button"
                onClick={() => {
                  // pass handleDelete here
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
