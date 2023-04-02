"use client"

import variables from "@/app/variables.module.sass";

const tablet = Number(parseInt(variables.breakpointTablet))
const mobile = Number(parseInt(variables.breakpointMobile))

export default {
  tablet,
  mobile,
}

export const isMobile = () => window.innerWidth <= mobile;
export const isTablet = () => window.innerWidth <= tablet;
