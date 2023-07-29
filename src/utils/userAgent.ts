import { headers } from "next/headers";
import { Breakpoint } from "@/utils/responsive";

export const userAgentBreakPoint = () => {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') ?? "SSR"
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isTablet = () => Boolean(userAgent.match(/iPad/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i))

  const isMobile = () => Boolean((isAndroid() || isIos() || isOpera() || isWindows() )&& !isTablet())

  const breakpoint: Breakpoint = isMobile() ? "mobile" : isTablet() ? "tablet" : "default"

  return breakpoint;
}

export const useUserAgent = () => {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') ?? "SSR"
  // const userAgent = ''
  const isAndroid = () => Boolean(userAgent.match(/Android/i))
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
  const isTablet = () => Boolean(userAgent.match(/iPad/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
  const isSSR = () => Boolean(userAgent.match(/SSR/i))
  const isMobile = () => Boolean((isAndroid() || isIos() || isOpera() || isWindows() )&& !isTablet())
  const isDesktop = () => Boolean(!isMobile() && !isTablet() && !isSSR())

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isTablet,
    isIos,
    isSSR,
    current: {
      isMobile: isMobile(),
      isTablet: isTablet(),
      isDesktop: isDesktop(),
      isAndroid: isAndroid(),
      isIos: isIos(),
      isSSR: isSSR(),
    }
  }
}