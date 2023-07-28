import { Breakpoint, cssCellHeight } from "@/utils/responsive";
import { GridLayoutData, identifier } from "@/utils/grid/types";
import { ArchiveListItem } from "@/api/queries/allArchives";
import styles from "@/app/archives/page.module.sass";
import {
  ArchiveGridItem,
  ArchiveGridItemPreview
} from "@/app/archives/ArchiveGridItem";

interface ArchivesGridProps {
  gridLayout: GridLayoutData<ArchiveListItem>;
  breakpoint: Breakpoint;
  doPreview: boolean;
  selectedId: identifier | null;
  selectedIndex: number | null;
  hide: boolean;
  selectArchive: (i: number) => void;
}

export const ArchivesGrid = ({ gridLayout, breakpoint, doPreview, selectedId, selectedIndex, selectArchive, hide }: ArchivesGridProps) => {
  const style = {
    height: gridLayout.layoutDimensions.height,
    minHeight: gridLayout.layoutDimensions.height,
    gridAutoRows: cssCellHeight(1, false, breakpoint),
  }

  return (
    <div className={styles.archivesGridContainer} style={style}>
    {gridLayout.items.map((item, index) =>
        <ArchiveGridItem
          doPreview={doPreview}
          index={index}
          item={item}
          key={item.id}
          isSelected={selectedId === item.id}
          selectedIndex={selectedIndex}
          select={() => selectArchive(index)}
          breakpoint={breakpoint}
          hide={hide}
        />
      )}

  {gridLayout.items.map((item, index) =>
    <ArchiveGridItemPreview
      doPreview={doPreview}
      index={index}
      item={item}
      key={item.id}
      isSelected={selectedId === item.id}
      selectedIndex={selectedIndex}
      select={() => selectArchive(index)}
      breakpoint={breakpoint}
      hide={hide}
    />
  )}
</div>
  )
}