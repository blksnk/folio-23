
export const storage = {
  get: (k: string) => (window && window.localStorage && window.localStorage.getItem(k)) ?? null,
  set: (k: string, v: string) => window && window.localStorage && window.localStorage.setItem(k, v),
  del: (k: string) => window && window.localStorage && window.localStorage.removeItem(k),
}

export const storageKeys = {
  // use to check for navigation inside website and dispatch animations accordingly
  concurrentPageLoad: {
    key: "concurrentPageLoad",
    values: {
      true: "true",
      false: "false",
    },
  }
}