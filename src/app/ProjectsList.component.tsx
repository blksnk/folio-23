"use client";

import styles from "./page.module.sass";
import {
  TextLine,
  type TextLineProps,
} from "@/components/AnimatedText/TextLine";
import Link from "next/link";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import fontRepo from "@/app/fonts";
import { cn, replaceWithSpacesWhenHidden, type ClassDef } from "@/utils/css";
import { ProjectListItemData } from "@/api/queries/allProjects";
import { Arrow, type ArrowProps } from "@/components/Arrow.component";

export const formatNumber = (n: number): string =>
  n < 10 ? "0" + n : String(n);
const extractYear = (date: string) => date.split("-")[0];

const profileDescription = `Creative designer with a focus on 3D,
branding, UI and all things *experimental*.`;
const profileName = "Jean-Nicolas Veigel";
const archiveTitle = "Archives repository";
const archiveDescription = `One-off projects, logos, graphics.
Exploring random stuff.`;

interface PageLeftProps {
  changeActiveIndex: (n: 1 | -1) => void;
  setActiveIndex: (n: number) => void;
  hide?: boolean;
  projects: ProjectListItemData[];
  activeIndex: number;
  redirectOnConfirm: () => void;
  redirectTo: (url: string) => void;
}

export const PageLeft = (props: PageLeftProps) => {
  const { hide } = props;
  const activeProject = useMemo(() => {
    return (
      props.projects[props.activeIndex] ?? {
        id: "unknown id",
        backgroundColor: { hex: "#000000" },
      }
    );
  }, [props.projects, props.activeIndex]);

  return (
    <>
      <ListNew {...props} />
      <ActiveProjectOverlays activeProject={activeProject} hide={hide} />
    </>
  );
};

type ListNewProps = PageLeftProps;

const ListNew = (props: PageLeftProps) => {
  return (
    <section className={styles.listNewContainer}>
      <ul className={styles.listNew}>
        {props.projects.map((project, index) => (
          <ListNewItem
            {...props}
            project={project}
            index={index}
            key={project.id}
          />
        ))}
      </ul>
      <ListArrows
        hide={props.hide}
        changeActiveIndex={props.changeActiveIndex}
      />
    </section>
  );
};

type ListNewItemProps = Pick<
  ListNewProps,
  "activeIndex" | "setActiveIndex" | "redirectOnConfirm" | "hide"
> & {
  index: number;
  project: ListNewProps["projects"][number];
};

const ListNewItem = (props: ListNewItemProps) => {
  const isActive = useMemo(() => props.index === props.activeIndex, [props]);
  const elementRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isActive && elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [isActive, elementRef]);

  const handleClick = useCallback(() => {
    if (isActive) {
      props.redirectOnConfirm();
    }
    props.setActiveIndex(props.index);
  }, [isActive, props.index, props.redirectOnConfirm, props.setActiveIndex]);

  const klass = cn(
    styles.listNewItem,
    [styles.hide, props.hide],
    [styles.active, isActive]
  );

  const cellProps = useCallback(
    (children: string, ...classes: ClassDef[]): TextLineProps => ({
      animatedTextProps: {
        fixedDuration: props.hide ? 300 : 600,
        delay: props.hide ? 0 : props.index * 300,
      },
      active: isActive && !props.hide,
      className: cn(styles.listNewItemCell, ...classes),
      children: replaceWithSpacesWhenHidden(children, props.hide),
    }),
    [isActive, props.index, handleClick]
  );

  return (
    <li
      className={klass}
      ref={elementRef}
      onClick={handleClick}
      tabIndex={props.index}
      title={props.project.title}
      role="article"
    >
      <div className={cn(styles.listNewItemCellContainer, styles.index)}>
        <TextLine {...cellProps(formatNumber(props.index + 1))} />
      </div>

      <div className={cn(styles.listNewItemCellContainer, styles.title)}>
        <TextLine {...cellProps(props.project.title)} />
        <TextLine
          {...cellProps(`[${extractYear(props.project.year)}]`, styles.year)}
        />
      </div>

      <div className={cn(styles.listNewItemCellContainer, styles.type)}>
        <TextLine {...cellProps(props.project.type)} />
      </div>

      <div className={cn(styles.listNewItemCellContainer, styles.client)}>
        <TextLine {...cellProps(props.project.client)} />
      </div>
    </li>
  );
};

type ListArrowsProps = Pick<PageLeftProps, "hide" | "changeActiveIndex">;

const ListArrows = (props: ListArrowsProps) => {
  return (
    <>
      <ArrowButton
        hide={props.hide}
        onClick={() => props.changeActiveIndex(-1)}
      />
      <ArrowButton
        hide={props.hide}
        down
        onClick={() => props.changeActiveIndex(1)}
      />
    </>
  );
};

type ArrowButtonProps = ArrowProps & {
  onClick?: () => void;
  hide?: boolean;
};
const ArrowButton = (props: ArrowButtonProps) => {
  const klass = cn(
    styles.listArrowButton,
    [styles.hide, props.hide],
    [styles.down, props.down],
    [styles.up, !props.down]
  );
  return (
    <button className={klass} onClick={props.onClick}>
      <Arrow down={props.down} />
    </button>
  );
};

type ActiveProjectIdProps = {
  activeProject: Pick<ProjectListItemData, "backgroundColor" | "id">;
  hide?: boolean;
};

const ActiveProjectOverlays = ({
  activeProject: {
    backgroundColor: { hex },
    id,
  },
  hide,
}: ActiveProjectIdProps) => {
  return (
    <>
      <div className={styles.activeProjectId}>
        <TextLine
          className={styles.activeId}
          animatedTextProps={{
            fixedDuration: 600,
            delay: 0,
          }}
        >
          {replaceWithSpacesWhenHidden(id, hide)}
        </TextLine>
      </div>
      <div className={styles.activeProjectColor}>
        <TextLine
          className={styles.color}
          animatedTextProps={{
            fixedDuration: 600,
            delay: 0,
          }}
        >
          {replaceWithSpacesWhenHidden(hex, hide)}
        </TextLine>
      </div>
    </>
  );
};
