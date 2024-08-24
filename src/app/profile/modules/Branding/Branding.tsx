"use client";

import { useTransition } from "@/utils/transition";
import styles from "./Branding.module.sass";
import { cnl } from "@/utils/css";
import Image from "next/image";
import { Blobs } from "@/components/Blobs/Blobs.component";
import { useCallback, useRef } from "react";

export const Branding = () => {
  const elementRef = useRef<HTMLElement | null>(null);
  const { transitionOut } = useTransition();
  const c = cnl(styles.hide, transitionOut);

  const blobSize = useCallback(() => {
    if (!elementRef.current) return 400;
    const { width, height } = elementRef.current.getBoundingClientRect();
    console.log(width, height);
    const padding = 1;
    return {
      width: width - padding,
      height: height - padding,
    };
  }, []);
  return (
    <section className={styles.branding} ref={elementRef}>
      <Image
        src="/branding.svg"
        fill
        alt="veigel.studio"
        className={c(styles.brandingImg)}
      />
      <Blobs
        count={9}
        overlay
        mixBlendMode="color-burn"
        size={blobSize}
        className={styles.brandingBlobs}
        fill
      />
      <Image
        src="/branding.svg"
        fill
        alt="veigel.studio"
        className={c(styles.brandingImg)}
      />
    </section>
  );
};
