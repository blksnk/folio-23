import styles from "./newProject.module.sass"
import { TextLine } from "@/components/AnimatedText/TextLine";
import { Logo } from "@/components/Logo.component";
import Link from "next/link";
import { FormattedProjectMedia } from "@/api/queries/oneProject";
import { LineGroup } from "@/components/Lines/LineGroup";
import { combineClasses, replaceWithSpacesWhenHidden } from "@/utils/css";
import { textAnimation } from "@/utils/transition";
export const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

interface LeftContentProps {
  media?: FormattedProjectMedia,
  color?: string;
  hide?: boolean;
  redirect: () => void;
}

export const LeftContent = ({ media, color, hide, redirect }: LeftContentProps) => {
  const onRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    redirect()
  }

  const hideClass = [styles.hide, hide];

  return (
    <>
      <section className={styles.leftContent}>
        <div className={styles.leftColumn}>
          <Link href="/new" className={combineClasses(styles.logoContainer, hideClass as [string, boolean])} onClick={onRedirect}>
            <Logo outline/>
          </Link>
          <div className={styles.leftColumnSpacerContainer}>
            <TextLine className={styles.leftColumnSpacer}>00</TextLine>
          </div>
          <ActiveMediaTitle media={media} hide={hide}/>
          <ActiveMediaColor color={color} hide={hide}/>
        </div>
        <div className={l(styles.leftContentLeftLine, hide)}></div>
        <div className={l(styles.leftContentRightLine, hide)}></div>
        <div className={l(styles.leftContentVerticalLines, hide)}>
          <LineGroup count={10} direction="horizontal" spacing={{ from: 12, to: 6}}/>
        </div>
      </section>
    </>
  )
}

interface ActiveMediaTitleProps {
  media?: FormattedProjectMedia,
  hide?: boolean;
}

const ActiveMediaTitle = (props: ActiveMediaTitleProps) => {
  if(!props.media) return null
  const textProps = textAnimation(props.hide)

  return (
    <section className={styles.mediaTitleContainer}>

      <TextLine animatedTextProps={textProps} >{replaceWithSpacesWhenHidden(props.media.displayTitle, props.hide)}</TextLine>
    </section>
  )
}

interface ActiveMediaColorProps {
  color?: string,
  hide?: boolean;
}

const ActiveMediaColor = (props: ActiveMediaColorProps) => {
  if(!props.color) return null
  const textProps = textAnimation(props.hide)

  return (
    <section className={styles.mediaColorContainer}>
      <TextLine animatedTextProps={textProps} >{replaceWithSpacesWhenHidden(props.color, props.hide)}</TextLine>
    </section>
  )
}