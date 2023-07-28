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
} from "@/app/project/[slug]/ProjectRenderer.component";
import { getAverageColors } from "@/utils/averageColor";

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

  const formatVideoUrl = (url: string) => {
    const parts = url.split('/')
    console.log(parts)
    return "https://" + parts[2] + "/" + parts[parts.length - 1]
  }

  const formatSingleMedia = (m: ProjectMedia, i: number): FormattedProjectMedia => {
    const isVideo = m.asset.mimeType.includes("video")
    const a = m.videoThumbnail ?? m.asset;
    const imgRatio = a.width / a.height;
    const title = displayTitles[i];
    const titleDiff = longestMediaTitleLength - title.length
    const displayTitle = title + Array(titleDiff).fill(" ").join("");
    const isPortrait = 1 > imgRatio
    const closestRatio = getClosestRatio(imgRatio);
    return {
      displayTitle,
      imgRatio,
      closestRatio,
      url: isVideo ? formatVideoUrl(m.asset.url) : m.asset.url,
      videoThumbnailUrl: m.videoThumbnail?.url,
      id: m.id,
      isVideo,
      isPortrait,
    }
  }
  return medias.map((m, i) => formatSingleMedia(m, i));
}
const sortMediasByRatio = (medias: FormattedProjectMedia[]) => {
  return [...medias].sort((a, b) => {
    const comp = a.isPortrait && b.isPortrait ? -1 : 1
    return a.imgRatio > b.imgRatio ? -comp : comp;
  })
}

const findNonPortraitMediaCount = (medias: FormattedProjectMedia[]) => medias.reduce((acc: number, media) => {
  return (media.isPortrait ? acc : acc + 1)
}, 0)

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProjectData(params.slug)

  if(!project) {
    // TODO: redirect to not found
    return null
  }

  const formattedMedias = formatProjectMedias(project?.medias ?? []);
  const mediaUrls = formattedMedias.map(m => m.videoThumbnailUrl ?? m.url);
  // TODO: add slight random variation to each background color of a project
  const colors = await getAverageColors(mediaUrls)
  const mediasByRatio = sortMediasByRatio(formattedMedias)

  const rendererProps = {
    medias: formattedMedias,
    mediasByRatio,
    nonPortraitMediaCount: findNonPortraitMediaCount(mediasByRatio),
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