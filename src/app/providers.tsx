"use client";

import { ReactNode } from "react";
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../../prismicio'
import Link from "next/link";


export function Providers({ children }: { children: ReactNode }) {
  return (
    <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
      {children}
    </PrismicProvider>
  );
}