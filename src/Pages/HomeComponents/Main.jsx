import AboutDonations from "./AboutDonations";
import CategoriesList from "./CategoriesList";
import ProjectsList from "./ProjectsList";

export default function Main({
  projectsToRender,
  categories,
  setProjects,
  donations,
  users,
}) {
  return (
    <main>
      <AboutDonations donations={donations} users={users} />
      <CategoriesList categories={categories} setProjects={setProjects} />
      <ProjectsList projectsToRender={projectsToRender} />
    </main>
  );
}
