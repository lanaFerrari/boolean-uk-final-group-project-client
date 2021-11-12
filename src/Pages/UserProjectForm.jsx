import React, { useState } from "react";

export default function UserProjectForm({ categories }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState(0);
  const [projectCategories, setProjectCategories] = useState([]);

  const handleTitleInput = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };
  const handleDescriptionInput = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };
  const handleGoalInput = (e) => {
    console.log(e.target.value);
    setGoal(e.target.value);
  };
  const handlecategoriesCheckbox = (e) => {
    const isChecked = e.target.checked;
    const selectedCategory = e.target.value;
    console.log({ selectedCategory, isChecked });
    console.log({ projectCategories });

    if (isChecked) {
      setProjectCategories([...projectCategories, selectedCategory]);
    } else {
      const filteredCategories = projectCategories.filter(
        (category) => selectedCategory !== category
      );
      console.log({ filteredCategories });
      setProjectCategories(filteredCategories);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="center form-stack light-shadow" onSubmit={handleSubmit}>
      <h1>Add new project</h1>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        value={title}
        required
        onChange={handleTitleInput}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="3"
        cols="65"
        value={description}
        onChange={handleDescriptionInput}
      ></textarea>

      <label htmlFor="goal">Goal:</label>
      <input
        id="goal"
        name="goal"
        type="number"
        min="0"
        value={goal}
        required
        onChange={handleGoalInput}
      />

      <label htmlFor="categories">Categories:</label>
      {categories.map((category, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              name={category.name}
              value={category.name}
              checked={projectCategories.includes(category.name)}
              onChange={handlecategoriesCheckbox}
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        );
      })}

      <div className="actions-section">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
