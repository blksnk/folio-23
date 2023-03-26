import GridLayout from "@/layouts/GridLayout";
import styles from "./ProjectsListGrid.module.sass"

const api = 'https://jsonplaceholder.typicode.com/photos'

type Project = {
  title: string;
  thumbnailUrl: string;
}

const fetchProjects = async () => {
  try {
    const res = await fetch(api, {
      cache: "no-cache"
    });
    const data =  await res.json()
    return data as Project[]
  } catch(e) {
    console.error(e)
    return []
  }
}

export default async function ProjectsListGrid() {
  const projects = (await fetchProjects()).slice(0, 15);
  console.log(projects)
  return (
    <GridLayout className={styles.container}>
      {projects.map((project, index) => <span key={"project" + index}>{ project.title }</span>)}
    </GridLayout>
  )
}