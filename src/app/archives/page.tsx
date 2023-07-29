import styles from "./page.module.sass"
import { queryClient } from "@/api/client";
import {
  allArchives,
  AllArchivesResponse,
} from "@/api/queries/allArchives";
import { archivesToGridLayout } from "@/utils/archives";
import { getAverageColors } from "@/utils/averageColor";
import UserAgentWrappedRenderer
  from "@/app/archives/UserAgentWrapper.component";

const fetchArchives = async () => {
  const { archives } = await queryClient<AllArchivesResponse, { archives: never[] }>(allArchives, { archives: [] }, { height: 1024 })
  return archives;
}


export default async function Archive() {
  const archives = await fetchArchives()
  const archiveUrls = archives.map(({ media }) => media.asset.url ?? "");
  const colors = await getAverageColors(archiveUrls)
  const archivesWithColors = archives.map((archive, index) => ({...archive, color: colors[index]}))
  const gridLayout = archivesToGridLayout(archivesWithColors, "default");
  const orderedCoverUrls = gridLayout.items.map((item, index) => item.extraData?.media.asset.url ?? archiveUrls[index])
  const orderedColors = gridLayout.items.map((item, index) => item.extraData?.color ?? colors[index])


  return (
    <main className={styles.main}>
      <UserAgentWrappedRenderer archives={archivesWithColors} gridLayout={gridLayout} colors={orderedColors} coverUrls={orderedCoverUrls}/>
    </main>
  )
}