import styles from "./page.module.sass";
import {
  allProjects,
  AllProjectsResponse,
  type ProjectListItemData,
} from "@/api/queries/allProjects";
import { Renderer } from "@/app/Renderer.component";
import { queryClient } from "@/api/client";
import { headers } from "next/headers";
import { DateAndWeather, Links, Overlay } from "./modules";

const fetchProjects = async () => {
  const res = await queryClient<AllProjectsResponse, { projects: never[] }>(
    allProjects,
    { projects: [] },
    { height: 2700 }
  );
  return res.projects;
};

const sortProjects = (
  projects: ProjectListItemData[]
): ProjectListItemData[] => {
  return projects.sort((a, b) => {
    const dateCompare = a.year
      .substring(0, 4)
      .localeCompare(b.year.substring(0, 4));
    if (dateCompare !== 0) return -dateCompare;

    return a.type.localeCompare(b.type);
  });
};

export default async function Home() {
  const headersList = headers();
  const city = headersList.get("x-request-city") ?? "";
  const weather = headersList.get("x-request-weather") ?? "";
  const projects = await fetchProjects();
  const sortedProjects = sortProjects(projects);
  const weatherProps = {
    city,
    weather,
  };
  return (
    <main className={styles.main}>
      <Renderer projects={sortedProjects}></Renderer>
      <Links />
      <Overlay />
      <DateAndWeather weatherProps={weatherProps} />
    </main>
  );
}
