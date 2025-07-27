import { GridLayoutData } from "@/utils/grid/types";
import { userAgent } from "@/utils/userAgent";
import { Breakpoint } from "@/utils/responsive";
import { ArchiveRenderer } from "@/app/archives/ArchiveRenderer";
import {
  ArchiveListItemWithColor,
  archivesToGridLayout,
  Color,
} from "@/utils/archives";

interface UserAgentWrapperProps {
  archives: ArchiveListItemWithColor[];
  gridLayout: GridLayoutData<ArchiveListItemWithColor>;
  colors: Color[];
  coverUrls: string[];
}

export default async function UserAgentWrappedRenderer(
  props: UserAgentWrapperProps
) {
  // get device type on server side
  // TODO: find a way to cache images while detecting user agent
  const agent = await userAgent();
  const breakpoint: Breakpoint = agent.current.isMobile
    ? "mobile"
    : agent.current.isTablet
    ? "tablet"
    : "default";
  let { gridLayout, coverUrls, colors } = props;
  if (breakpoint !== "default") {
    // re-compute tablet layout & re-order colors
    gridLayout = archivesToGridLayout(props.archives, breakpoint);
    coverUrls = gridLayout.items.map(
      ({ extraData }) => extraData?.media.asset.url ?? ""
    );
    colors = gridLayout.items.map(
      ({ extraData }, index) => extraData?.color ?? colors[index]
    );
  }
  const rendererProps = {
    ...props,
    gridLayout,
    coverUrls,
    colors,
    initialBreakpoint: breakpoint,
  };
  return <ArchiveRenderer {...rendererProps} />;
}
