import type { FormattedProjectMedia } from "@/api/queries/oneProject";
import { TextLine } from "@/components/AnimatedText/TextLine";
import { replaceWithSpacesWhenHidden } from "@/utils/css";
import styles from "./MediaInfo.module.sass";
import { textAnimation } from "@/utils/transition";

type ActiveMediaTitleProps = {
  media?: FormattedProjectMedia;
};

type ActiveMediaColorProps = {
  color?: string;
};

type MediaInfoProps = ActiveMediaTitleProps & ActiveMediaColorProps;

export const MediaInfo = ({ media, color }: MediaInfoProps) => {
  return (
    <>
      <ActiveMediaTitle media={media} />
      <ActiveMediaColor color={color} />
    </>
  );
};

const ActiveMediaTitle = (props: ActiveMediaTitleProps) => {
  if (!props.media) return null;
  const textProps = textAnimation();

  return (
    <section className={styles.mediaTitleContainer}>
      <TextLine animatedTextProps={textProps}>
        {props.media.displayTitle}
      </TextLine>
    </section>
  );
};

const ActiveMediaColor = (props: ActiveMediaColorProps) => {
  if (!props.color) return null;
  const textProps = textAnimation();

  return (
    <section className={styles.mediaColorContainer}>
      <TextLine animatedTextProps={textProps}>{props.color}</TextLine>
    </section>
  );
};
