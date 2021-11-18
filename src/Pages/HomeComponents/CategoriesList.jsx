import { useEffect, useState } from "react";

export default function CategoriesList({ categories, setProjects }) {
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
    <>
      <div className="padding-top padding-bottom centering">
        <h2 className="padding-top padding-bottom align-center boolean-green">
          Creative work shows us what’s possible. Help fund it here.
        </h2>
      </div>
      <div className="centering padding-top padding-bottom">
        <ul className="seven-c-grid ">
          {categories.map((category, index) => {
            const name = category.name;

            function getCategory() {
              setPickedCategory(`/projects/${category.name}`);
            }

            return (
              <li key={index} className="align-center">
                <button
                  className="button-Categories bold-font"
                  id="category"
                  onClick={() => getCategory()}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
