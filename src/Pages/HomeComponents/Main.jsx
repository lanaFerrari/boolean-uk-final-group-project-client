import AboutDonations from "./AboutDonations";
import CategoriesList from "./CategoriesList";
import ProjectsList from "./ProjectsList";

export default function Main({ projectsToRender, categories, setProjects }) {
  return (
    <main>
      <AboutDonations />
      <CategoriesList categories={categories} setProjects={setProjects} />
      <ProjectsList projectsToRender={projectsToRender} />
    </main>
  );
}
