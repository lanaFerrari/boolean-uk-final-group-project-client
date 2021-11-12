import { useEffect, useState } from "react";

export default function CategoriesList({ categories, projects, setProjects }) {
  const [pickedCategory, setPickedCategory] = useState("");

  function getProjectsByCategories() {
    const url = `${process.env.REACT_APP_API_URL}/projects/${pickedCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((categoriesData) => {
        setProjects(categoriesData);
      });
  }

  useEffect(() => {
    getProjectsByCategories();
  }, [pickedCategory]);

  return (
    <ul>
      {categories.map((category, index) => {
        const name = category.name;

        function getCategory() {
          setPickedCategory(`/projects/${category.name}`);
        }

        return (
          <li key={index}>
            <button id="category" onClick={() => getCategory()}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
