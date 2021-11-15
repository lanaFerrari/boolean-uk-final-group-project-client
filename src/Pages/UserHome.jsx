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
      .then((res) => res.json())
      .then((foundUser) => {
        setTargetUser(foundUser.response);
      });
  }, [targetId]);

  if (!targetUser) {
    return null;
  }

  if (targetUser.name !== userName) {
    history.push(`/${targetUser.id}/${targetUser.name}/`);
    return null;
  }

  return (
    <>
      <h1>Hello, {targetUser.name}!</h1>
      <hr />
      <>
        <Link to={`/${targetId}/${userName}/myProjects`}>
          <h2>My Projects</h2>
        </Link>
        <Link to={`/${targetId}/${userName}/create-project`}>
          <h2>Create Project</h2>
        </Link>
        <Link to="/">
          <h2>Donate</h2>
        </Link>
      </>
    </>
  );
}
