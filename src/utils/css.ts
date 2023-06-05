type ClassDef = [string, boolean | undefined] | string | [ string ];

export const combineClasses = (...classes: ClassDef[]): string => {
  return classes.reduce((acc: string, classDef) => {
    let additionalClass = ""
    if (typeof classDef === "string") {
      additionalClass = classDef
    }
    else if (classDef.length === 1) {
      additionalClass = classDef[0]
    }
    else {
      additionalClass = classDef[1] ? classDef[0] : ""
    }
    return `${acc} ${additionalClass}`
  }, "") as string
}

export const replaceWithSpacesWhenHidden = (s: string, hide?: boolean) => hide ? Array(s.length).fill(" ").join("") : s
