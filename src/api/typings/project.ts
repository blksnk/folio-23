export const ProjectTypes = [
  "ux_ui",
  "branding",
  "print",
  "photo",
  "packaging",
  "graphic design",
] as const;

export type ProjectType = typeof ProjectTypes[number];