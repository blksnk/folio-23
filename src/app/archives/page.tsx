import styles from "./page.module.sass"
import { queryClient } from "@/api/client";
import {
  allArchives,
  AllArchivesResponse,
} from "@/api/queries/allArchives";
import { ArchiveRenderer } from "@/app/archives/ArchiveRenderer";
import { archivesToGridLayout } from "@/utils/archives";
import { useUserAgent } from "@/utils/userAgent";
import { Breakpoint } from "@/utils/responsive";
import { getAverageColors } from "@/utils/averageColor";

const fetchArchives = async () => {
  const { archives } = await queryClient<AllArchivesResponse, { archives: never[] }>(allArchives, { archives: [] }, { height: 2000 })
  return archives;
}


export default async function Archive() {
  // get device type on server side
  const userAgent = useUserAgent()
  const breakpoint: Breakpoint = userAgent.current.isMobile ? "mobile" : userAgent.current.isTablet ? "tablet" : "default"
  const archives = await fetchArchives()
  const gridLayout = archivesToGridLayout(archives, breakpoint);
  const archiveUrls = gridLayout.items.map(({ extraData }) => extraData?.media.asset.url ?? "");
  const colors = await getAverageColors(archiveUrls)


  return (
    <main className={styles.main}>
      <ArchiveRenderer archives={archives} gridLayout={gridLayout} initialBreakpoint={breakpoint} colors={colors} coverUrls={archiveUrls}/>
    </main>
  )
}