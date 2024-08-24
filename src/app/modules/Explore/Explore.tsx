"use client";
import styles from "./explore.module.sass";
import { TextLine } from "@/components/AnimatedText/TextLine";
import fontRepo from "@/app/fonts";
import Link from "next/link";
import { cn, cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";
import { useCallback, useMemo } from "react";

const createProjectLink = (slug: string) => "/project/" + slug;

interface ExploreProps {
  slug: string;
}

export const Explore = ({ slug }: ExploreProps) => {
  const { transitionOut, redirectTo } = useTransition();
  const c = cnl(styles.hide, transitionOut);

  const href = useMemo(() => createProjectLink(slug), [slug]);

  const triggerPageTransitionOnClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      redirectTo(href);
    },
    [href, redirectTo]
  );
  return (
    <section className={styles.explore}>
      <Link
        onClick={triggerPageTransitionOnClick}
        className={c(styles.container)}
        href={href}
      >
        <TextLine className={styles.topText}>dive deeper</TextLine>

        <h2 className={c(fontRepo.button.className, styles.title)}>Explore</h2>

        <TextLine className={styles.bottomText}>view contents</TextLine>
      </Link>
    </section>
  );
};
