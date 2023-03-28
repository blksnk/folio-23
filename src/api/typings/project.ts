
// project type literals. order controls work page sorting and layout
export const ProjectTypes = [
  "ux_ui",
  "print",
  "branding",
  "packaging",
  "photo",
  "graphic design",
] as const;

export type ProjectType = typeof ProjectTypes[number];