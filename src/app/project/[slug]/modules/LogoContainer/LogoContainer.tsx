"use client";

import { cnl } from "@/utils/css";
import { useTransition } from "@/utils/transition";
import type { MouseEventHandler } from "react";
import styles from "./LogoContainer.module.sass";
import Link from "next/link";
import { Logo } from "@/components/Logo.component";

export const LogoContainer = () => {
  const { redirectTo, transitionOut } = useTransition();
  const c = cnl(styles.hide, transitionOut);

  const redirectToHome: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    redirectTo("/");
  };
  return (
    <Link href="/" onClick={redirectToHome} className={c(styles.logoContainer)}>
      <Logo outline />
    </Link>
  );
};
