import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

export default function UserHome() {
  const history = useHistory();
  const { userId, userName } = useParams();
  const targetId = parseInt(userId);
  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${targetId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((foundUser) => {
        if (
          typeof foundUser === "object" &&
          !Array.isArray(foundUser) &&
          foundUser !== null
        ) {
          setTargetUser(foundUser.response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [targetId]);

  if (!targetUser) {
    return null;
  }

  if (targetUser.name !== userName) {
    history.push(`/user/${targetUser.id}/${targetUser.name}/`);
    return null;
  }

  return (
    <>
      <div className="padding-top padding-bottom align-center">
        <h1 className="blue-color">Hello, {targetUser.name}!</h1>
      </div>
      <hr />
      <div className="adding-height padding-top padding-bottom three-c-grid align-center centering">
        <Link to={`/user/${targetId}/${userName}/myProjects`}>
          <h2 className="align-center">My Projects</h2>
        </Link>
        <Link to={`/user/${targetId}/${userName}/create-project`}>
          <h2 className="align-center">Create Project</h2>
        </Link>
        <Link to="/">
          <h2 className="align-center">Donate</h2>
        </Link>
      </div>
    </>
  );
}
