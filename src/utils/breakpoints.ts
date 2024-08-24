"use client";

const tablet = 900;
const mobile = 650;

export default {
  tablet,
  mobile,
};

export const isServer = typeof window === "undefined";

const w = isServer ? { innerWidth: 1200, innerHeight: 1200 } : window;

export const isMobile = () => w.innerWidth <= mobile;
export const isTablet = () => w.innerWidth <= tablet;

export const isVertical = () => w.innerWidth < w.innerHeight;

export type Breakpoints = {
  isTablet: boolean;
  isMobile: boolean;
  isVertical: boolean;
};

export const breakpoints = {
  isMobile,
  isTablet,
  isVertical,
};
