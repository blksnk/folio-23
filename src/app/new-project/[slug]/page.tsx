import styles from "./newProject.module.sass"
import { queryClient } from "@/api/client";
import {
  FormattedProjectMedia,
  oneProject,
  ProjectDataResponse,
  ProjectMedia
} from "@/api/queries/oneProject";
import { getClosestRatio } from "@/components/Gallery/data";
import {
  ProjectRenderer
} from "@/app/new-project/[slug]/ProjectRenderer.component";
import { getAverageColor } from "@/utils/averageColor";

const coverSize = 2000

const fetchProjectData = async (slug: string) => {
  const res = await queryClient<ProjectDataResponse, { project: null }>(oneProject, { project: null }, { width: coverSize, slug })
  return res.project
}

const formatProjectMedias = (medias: ProjectMedia[]): FormattedProjectMedia[] => {
  const formatDisplayTitle = (m: ProjectMedia) => m.title.replaceAll(' ', '_') + "." + m.asset.mimeType.split('/')[1];
  const displayTitles = medias.map(m => formatDisplayTitle(m));

  const longestMediaTitleLength = displayTitles.reduce((acc, title) => {
    return title.length > acc ? title.length : acc
  }, 0)

  const formatSingleMedia = (m: ProjectMedia, i: number) => {
    const imgRatio = m.asset.width / m.asset.height;
    const title = displayTitles[i];
    const titleDiff = longestMediaTitleLength - title.length
    const displayTitle = title + Array(titleDiff).fill(" ").join("");
    const closestRatio = getClosestRatio(imgRatio);
    const isVideo = m.asset.mimeType.includes("video")
    return {
      displayTitle,
      imgRatio,
      closestRatio,
      url: m.asset.url,
      id: m.id,
      isVideo,
    }
  }
  return medias.map((m, i) => formatSingleMedia(m, i));
}

const getAverageColors = async (mediaUrls: string[]) => {
  const colors = await Promise.all(mediaUrls.map((url) => getAverageColor(url, {
    mode: "speed",
    algorithm: "sqrt",
  })));
  console.log(colors);
  return colors.map(c => ({
    values: c.value,
    hex: c.hex,
    rgb: c.rgb
  }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProjectData(params.slug)

  if(!project) {
    // TODO: redirect to not found
    return null
  }

  const formattedMedias = formatProjectMedias(project?.medias ?? []);
  const mediaUrls = formattedMedias.map(m => m.url);
  // TODO: add slight random variation to each background color of a project
  const colors = await getAverageColors(mediaUrls)

  const rendererProps = {
    medias: formattedMedias,
    coverUrls: mediaUrls,
    colors,
    project,
  }
  return (
    <main className={styles.main}>
      <ProjectRenderer {...rendererProps} />
    </main>
  )
}