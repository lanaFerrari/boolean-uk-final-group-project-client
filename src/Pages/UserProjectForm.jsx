import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

export default function UserProjectForm({
  categories,
  projects,
  setProjects,
  users,
  setUsers,
}) {
  const history = useHistory();
  const { userId, userName } = useParams();
  const targetUserId = parseInt(userId);

  const [targetUser, setTargetUser] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [projectCategoryIds, setProjectCategoryIds] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${targetUserId}`)
      .then((res) => res.json())
      .then((foundUser) => {
        setTargetUser(foundUser.response);
      });
  }, [targetUserId]);

  if (!targetUser) {
    return null;
  }

  if (targetUser.name !== userName) {
    history.push(`/user/${targetUserId}/${targetUser.name}/create-project`);
    return null;
  }

  const handleCategoriesCheckbox = (e) => {
    const isChecked = e.target.checked;
    const selectedCategoryId = parseInt(e.target.value);

    if (isChecked) {
      setProjectCategoryIds([...projectCategoryIds, selectedCategoryId]);
    } else {
      const filteredCategoryIds = projectCategoryIds.filter(
        (categoryId) => selectedCategoryId !== categoryId
      );
      setProjectCategoryIds(filteredCategoryIds);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectDetails = {
      title,
      description,
      goal: parseInt(goal),
      categoryIds: projectCategoryIds,
      userId: parseInt(targetUser.id),
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDetails),
    };

    fetch(`${process.env.REACT_APP_API_URL}/projects`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((newProject) => {
        if (
          typeof newProject === "object" &&
          !Array.isArray(newProject) &&
          newProject !== null
        )
          setProjects([...projects, newProject]);

        const updatedUsers = users.map((_user) => {
          if (_user.id === targetUser.id) {
            return {
              ..._user,
              projects: [..._user.projects, newProject],
            };
          } else {
            return {
              _user,
            };
          }
        });

        setUsers(updatedUsers);

        history.push(`/user/${userId}/${userName}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="adding-height padding-top padding-bottom align-center">
      <form
        className="center form-stack light-shadow padding-form"
        onSubmit={handleSubmit}
      >
        <h1 className="blue-color align-center">Add new project</h1>
        <label htmlFor="title">Title:</label>
        <input
          className="input-box"
          id="title"
          name="title"
          type="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          className="input-box"
          id="description"
          name="description"
          rows="3"
          cols="50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="goal">Goal:</label>
        <input
          className="input-box"
          id="goal"
          name="goal"
          type="number"
          min="0"
          value={goal}
          required
          onChange={(e) => setGoal(e.target.value)}
        />

        <label htmlFor="categories" className="padding-top">
          Categories:
        </label>
        <div className="three-c-grid">
          {categories.map((category, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  name="categories"
                  value={category.id}
                  checked={projectCategoryIds.includes(category.id)}
                  onChange={handleCategoriesCheckbox}
                />
                <label className="gap" htmlFor={category.name}>
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>

        <div className="actions-section padding-top padding-bottom flex-end">
          <button className="button-style" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
