import AboutDonations from "./AboutDonations";
import CategoriesList from "./CategoriesList";
import ProjectsList from "./ProjectsList";

export default function Main({ projects, categories, setProjects }) {
  return (
    <main>
      <AboutDonations />
      <CategoriesList
        categories={categories}
        projects={projects}
        setProjects={setProjects}
      />
      <ProjectsList projects={projects} />
    </main>
  );
}
