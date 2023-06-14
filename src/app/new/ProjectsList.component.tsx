"use client"

import styles from './page.module.sass'
import { TextLine } from "@/components/AnimatedText/TextLine";
import Link from "next/link";
import Image from "next/image";
import { LineGroup } from "@/components/Lines/LineGroup";
import { useState } from "react";
import fontRepo from "@/app/fonts";
import { combineClasses, replaceWithSpacesWhenHidden } from "@/utils/css";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { Logo } from "@/components/Logo.component";

export const formatNumber = (n: number): string => n < 10 ? "0" + n : String(n);
const extractYear = (date: string) => date.split('-')[0];
const l = (lineClass: string, hide?: boolean) => `${ hide ? styles.hideLine : '' } ${ lineClass }`

interface ArrowProps {
  down?: boolean;
  disabled?: boolean;
}

export const Arrow = (props: ArrowProps) => {
  const klass = `${ styles.arrow } ${ props.down ? styles.arrowDown : "" } ${ props.disabled ? styles.arrowDisabled : "" }`
  return (
    <div className={ klass }>
      <Image
        src="/arrow.svg"
        alt={ "Arrow " + (props.down ? "Down" : "Up") }
        width={ 14 }
        height={ 12 }
      />
    </div>
  )
}

const profileDescription = `Creative designer with a focus on 3D,
branding, UI and all things *experimental*.
Based in Paris.`
const profileName = "Jean-Nicolas Veigel"

interface PageLeftProps {
  changeActiveIndex: (n: (1 | -1)) => void;
  setActiveIndex: (n: number) => void;
  hide?: boolean;
  projects: ProjectListItemData[];
  activeIndex: number;
}

export const PageLeft = (props: PageLeftProps) => {
  const { hide } = props
  const [ hoveringIndex, setHoveringIndex ] = useState<number | null>(null)
  const active = (i: number) => i === props.activeIndex;
  const hovering = (i: number) => i === hoveringIndex;
  const activeProject = props.projects[props.activeIndex]
  const projectId = activeProject?.id ?? "unknown id"
  const activeProjectId = hide ? Array(projectId.length).fill(" ").join('') : projectId;
  const activeProjectColor = hide ? "       " : activeProject?.backgroundColor.hex ?? "#000000"
  const handleClick = (index: number) => () => props.setActiveIndex(index)
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
          } }>{ activeProjectColor }</TextLine>
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

        <button
          className={ combineClasses(styles.profile, [ styles.hide, hide ]) }>
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
        </button>
      </div>
      <div className={ styles.rightSplit }>
        <div className={ combineClasses(styles.profileCta, [styles.hide, hide])}>
          <h3 className={ fontRepo.button.className }>View profile</h3>
        </div>
        <div className={ l(styles.linesBottomCenter, hide) }>
          <LineGroup count={ 10 } spacing={ 14 } direction="horizontal"/>
        </div>
        <div className={ l(styles.lineVerticalTop, hide) }></div>

        <div className={ styles.activeIdContainer }>
          <TextLine className={ styles.activeId } animatedTextProps={ {
            fixedDuration: 600,
            delay: 0
          } }>{ activeProjectId }</TextLine>
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
      </div>
    </section>
  )
}