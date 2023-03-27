import { headers } from "next/headers";

export const isConsecutiveLoad = () => {
  const h = headers();
  const referer = h.get('referer')
  const host = h.get('host');
  const consecutiveLoad = (referer ?? "").includes((host ?? ""));
  return consecutiveLoad
}