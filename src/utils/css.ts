export type ClassDef = [string, boolean | undefined] | string | [string];

export const cn = (...classes: ClassDef[]): string => {
  return classes.reduce((acc: string, classDef: ClassDef) => {
    let additionalClass;
    if (!classDef) {
      additionalClass = "";
    }
    if (typeof classDef === "string") {
      additionalClass = classDef;
    } else if (classDef?.length === 1) {
      additionalClass = classDef[0];
    } else {
      additionalClass = classDef[1] ? classDef[0] : "";
    }
    return [acc, additionalClass].filter((c) => c && c.length > 0).join(" ");
  }, "") as string;
};

export const replaceWithSpacesWhenHidden = (s: string, hide?: boolean) =>
  hide
    ? Array(s.length)
        .fill(String.fromCharCode(160))
        .map((_, i) => (s[i] === "\n" || s[i] === " " ? s[i] : _))
        .join("")
    : s;

export const clamp = (n: number, min: number, max: number) => {
  return Math.max(Math.min(n, max), min);
};

export const cnl =
  (hideClass: string, hide?: boolean) =>
  (...lineClasses: ClassDef[]) =>
    cn(...lineClasses, [hideClass, hide]);
