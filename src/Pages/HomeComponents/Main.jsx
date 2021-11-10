import AboutDonations from "./AboutDonations";
import CategoriesList from "./CategoriesList";
import ProjectsList from "./ProjectsList";

export default function Main({ projects }) {
  return (
    <main>
      <AboutDonations />
      <CategoriesList />
      <ProjectsList projects={projects} />
    </main>
  );
}
