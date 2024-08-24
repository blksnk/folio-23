"use client";

import { TextLine } from "@/components/AnimatedText/TextLine";
import { useTransition } from "@/utils/transition";
import Link from "next/link";
import { useCallback, useMemo, type MouseEventHandler } from "react";
import styles from "./Links.module.sass";
import { cnl } from "@/utils/css";
import fontRepo from "@/app/fonts";

type LinkBlockProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  className: string;
};

export const LinkBlock = (props: LinkBlockProps) => {
  const { transitionOut, redirectTo } = useTransition();
  const redirectToHref = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      e.preventDefault();
      redirectTo(props.href);
    },
    [props]
  );

  const c = cnl(styles.hide, transitionOut);

  const buttonLabel = useMemo(() => `${props.buttonLabel} ↗`, [props]);
  return (
    <Link
      href={props.href}
      onClick={redirectToHref}
      className={c(styles.linkBlock, props.className)}
    >
      <div className={styles.linkBlockContent}>
        <TextLine
          animatedTextProps={{ fixedDuration: 600, delay: 0 }}
          className={styles.linkBlockTitle}
        >
          {props.title}
        </TextLine>
        <TextLine
          animatedTextProps={{ fixedDuration: 400, delay: 200 }}
          className={styles.linkBlockDescription}
        >
          {props.description}
        </TextLine>
      </div>
      <span className={c(styles.linkBlockCta, fontRepo.button.className)}>
        {buttonLabel}
      </span>
    </Link>
  );
};
