"use client"

import styles from './page.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import Link from "next/link";
import { LineGroup } from "@/components/Lines/LineGroup";
import { MouseEventHandler, useState } from "react";
import fontRepo from "@/app/fonts";
import { combineClasses, replaceWithSpacesWhenHidden } from "@/utils/css";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { Logo } from "@/components/Logo.component";
import { Arrow } from "@/components/Arrow.component";

export const formatNumber = (n: number): string => n < 10 ? "0" + n : String(n);
const extractYear = (date: string) => date.split('-')[0];
const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`


const profileDescription = `Creative designer with a focus on 3D,
branding, UI and all things *experimental*.`
const profileName = "Jean-Nicolas Veigel"
const archiveTitle = "Archives"
const archiveDescription = `One-off projects, logos, graphics.
Exploring random stuff.`

interface PageLeftProps {
  changeActiveIndex: (n: (1 | -1)) => void;
  setActiveIndex: (n: number) => void;
  hide?: boolean;
  projects: ProjectListItemData[];
  activeIndex: number;
  redirectOnConfirm: () => void;
  redirectTo: (url: string) => void;
}

export const PageLeft = (props: PageLeftProps) => {
  const { hide } = props
  const [ hoveringIndex, setHoveringIndex ] = useState<number | null>(null)
  const activeProject = props.projects[props.activeIndex]
  const activeProjectId = activeProject?.id ?? "unknown id"
  const activeProjectColor = activeProject?.backgroundColor.hex ?? "#000000";
  const handleClick = (index: number) => () => {
    if(index === props.activeIndex) {
      props.redirectOnConfirm();
    }
    props.setActiveIndex(index);
  }
  const handleHover = (index: number) => () => setHoveringIndex(index)

  const handleLeave = () => setHoveringIndex(null)

  const cellProps = (index: number) => ({
    onClick: handleClick(index),
    onEnter: handleHover(index),
    onLeave: handleLeave,
    animatedTextProps: { fixedDuration: 600, delay: index * 300 },
    active: index === props.activeIndex,
    hovering: index === hoveringIndex,
    className: styles.tableCell,
  })

  const redirectToArchive: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    props.redirectTo('/archives');
  }

  const redirectToProfile: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    props.redirectTo('/profile');
  }


  return (
    <section className={ styles.pageLeft }>
      <div className={ styles.leftSplit }>
        <div className={ l(styles.lineLeft, hide) }></div>
        <div className={ l(styles.lineRight, hide) }></div>
        <Link href="/"
              className={ combineClasses(styles.logoContainer, [ styles.hide, hide ]) }>
          <Logo/>
        </Link>
        <div className={ styles.colorContainer }>
          <TextLine className={ styles.color } animatedTextProps={ {
            fixedDuration: 600,
            delay: 0
          } }>{ replaceWithSpacesWhenHidden(activeProjectColor, hide) }</TextLine>
        </div>
        <div className={ combineClasses(l(styles.indices, hide), styles.table) }>
          { props.projects.map((_, index) =>
            <TextLine {...cellProps(index)} key={index}>
              { formatNumber(index + 1) }
            </TextLine>
          ) }
        </div>

        <div className={ combineClasses(l(styles.titles, hide), styles.table) }>
          { props.projects.map(({ title }, index) =>
            <TextLine {...cellProps(index)} key={index}>
              { title }
            </TextLine>
          ) }
        </div>

        <Link
          href="/profile"
          onClick={redirectToProfile}
          className={ combineClasses(styles.profile, [ styles.hide, hide ]) }>
          <div className={styles.columnContainer}>
            <TextLine
              animatedTextProps={ { fixedDuration: 600, delay: 0 } }
              className={ styles.name }
            >
              { replaceWithSpacesWhenHidden(profileName, hide) }
            </TextLine>
            <TextLine
              animatedTextProps={ { fixedDuration: 400, delay: 200 } }
              className={ styles.description }
            >
              { replaceWithSpacesWhenHidden(profileDescription, hide) }
            </TextLine>
          </div>
          <span className={combineClasses(styles.profileCta, fontRepo.button.className, [styles.hide, hide])}>Profile ↗</span>
        </Link>
      </div>
      <div className={ styles.rightSplit }>
        <div className={ l(styles.linesBottomCenter, hide) }>
          <LineGroup count={ 10 } spacing={ 14 } direction="horizontal"/>
        </div>
        <div className={ l(styles.lineVerticalTop, hide) }></div>

        <div className={ styles.activeIdContainer }>
          <TextLine className={ styles.activeId } animatedTextProps={ {
            fixedDuration: 600,
            delay: 0
          } }>{ replaceWithSpacesWhenHidden(activeProjectId, hide) }</TextLine>
        </div>

        <div className={ l(styles.linesCenterRight, hide) }>
          <LineGroup count={ 3 } spacing={ 6 } direction="horizontal"/>
        </div>

        <div className={ l(styles.info, hide) }>
          <div className={ combineClasses(styles.type, styles.table) }>
            { props.projects.map(({ type }, index) =>
              <TextLine {...cellProps(index)} key={index} >
                { type }
              </TextLine>
            ) }
          </div>
          <div className={ combineClasses(styles.client, styles.table) }>
            { props.projects.map(({ client }, index) =>
              <TextLine {...cellProps(index)} key={index} >
                { client }
              </TextLine>
            ) }
          </div>
          <div className={ combineClasses(styles.year, styles.table) }>
            { props.projects.map(({ year }, index) =>
              <TextLine {...cellProps(index)} key={index} >
                { extractYear(year) }
              </TextLine>
            ) }
          </div>
        </div>
        <div
          className={ combineClasses(styles.arrowsContainer, [ styles.hide, hide ]) }>
          <button className={ styles.arrowButton }
                  onClick={ () => props.changeActiveIndex(-1) }>
            <Arrow/>
          </button>
          <button className={ styles.arrowButton }
                  onClick={ () => props.changeActiveIndex(1) }>
            <Arrow down/>
          </button>
        </div>
        <Link
          href="/archives"
          onClick={redirectToArchive}
          className={ combineClasses(styles.archive, fontRepo.body.className, [ styles.hide, hide ]) }>
          <div className={styles.columnContainer}>
            <TextLine
              animatedTextProps={ { fixedDuration: 600, delay: 0 } }
              className={ styles.archiveTitle }
            >
              { replaceWithSpacesWhenHidden(archiveTitle, hide) }
            </TextLine>
            <TextLine
              animatedTextProps={ { fixedDuration: 400, delay: 200 } }
              className={ styles.description }
              log
            >
              { replaceWithSpacesWhenHidden(archiveDescription, hide) }
            </TextLine>
          </div>
          <span className={combineClasses(styles.archiveCta, fontRepo.button.className, [styles.hide, hide])}>Archives ↗</span>
        </Link>
      </div>
    </section>
  )
}