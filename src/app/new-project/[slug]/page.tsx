import styles from "./newProject.module.sass"
import {
  Gallery
} from "@/components/Gallery/Gallery";
import { queryClient } from "@/api/client";
import {
  FormattedProject,
  FormattedProjectMedia,
  oneProject,
  ProjectDataResponse,
  ProjectMedia
} from "@/api/queries/oneProject";
import { getClosestRatio } from "@/components/Gallery/data";
import {
  ProjectRenderer
} from "@/app/new-project/[slug]/ProjectRenderer.component";
import { clamp } from "@/utils/css";
import { getAverageColor } from "@/utils/averageColor";

const coverSize = 2000

const fetchProjectData = async (slug: string) => {
  const res = await queryClient<ProjectDataResponse, { project: null }>(oneProject, { project: null }, { width: coverSize, slug })
  return res.project
}

const formatProjectMedias = (medias: ProjectMedia[]): FormattedProjectMedia[] => {
  const formatSingleMedia = (m: ProjectMedia) => {
    const imgRatio = m.asset.width / m.asset.height;
    const displayTitle = m.title.replaceAll(' ', '_') + "." + m.asset.mimeType.split('/')[1];
    const closestRatio = getClosestRatio(imgRatio);
    return {
      displayTitle,
      imgRatio,
      closestRatio,
      url: m.asset.url,
      id: m.id,
    }
  }
  return medias.map(m => formatSingleMedia(m));
}

export const rgbToHex = (components: [number, number, number]) => '#' + components.map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

const createColorVariations = (rgbColor: string, nVariations: number, variance = 5, brightness = 0) => {
  // extract r, g, b numbers from string
  const [r, g, b] = rgbColor.slice(4, rgbColor.length - 1).split(',').map(c => parseInt(c));
  const getVariation = () => Math.max(Math.round(Math.random() * variance * 2)) - variance;
  const getAlteredColor = () => {
  // vary channel values by variance arg
    const altered = [r, g, b].map(channel => clamp(channel + getVariation() + brightness, 0, 255))
    // convert back to rgb string
    const alteredColor = `rgb(${altered.join(',')})`
    return { rgb: alteredColor, values: altered, hex: rgbToHex(altered) }
  }
  const variations =  Array(nVariations).fill('').map(_ => getAlteredColor());
  console.log(rgbColor, variations)
  return variations;
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
  console.log(colors)
  const colorVariations = createColorVariations(project.backgroundColor.css, formattedMedias.length, 30, -20);

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