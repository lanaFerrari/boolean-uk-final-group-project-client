import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, useHistory } from "react-router";

export default function EditProjectForm({ categories }) {
  const history = useHistory();
  const { userId, userName, projectId } = useParams();
  const targetProjectId = parseInt(projectId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [projectCategoryIds, setProjectCategoryIds] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects/${targetProjectId}`)
      .then((res) => res.json())
      .then((currentProject) => {
        setTitle(currentProject.title);
        setDescription(currentProject.description);
        setGoal(currentProject.goal);

        const categories = currentProject.categories;

        setProjectCategoryIds(
          categories.map((category) => {
            return category.category.id;
          })
        );
      });
  }, [targetProjectId]);

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
      userId: parseInt(userId),
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDetails),
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
      fetchOptions
    )
      .then((res) => res.json())
      .then((editProject) => {
        history.push(`/user/${userId}/${userName}/myProjects`);
      });
  };
  return (
    <div className="adding-height  align-center padding-bottom">
      <form
        className="center form-stack light-shadow padding-form"
        onSubmit={handleSubmit}
      >
        <h1 className="padding-bottom blue-color align-center">Edit project</h1>
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
          cols="45"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="goal">Goal:</label>
        <input
          id="goal"
          name="goal"
          type="number"
          min="0"
          value={goal}
          required
          onChange={(e) => setGoal(e.target.value)}
        />

        <label htmlFor="categories">Categories:</label>
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

        <div className="actions-section padding-top padding-bottom flex-end">
          <button className="button-style" type="submit" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
