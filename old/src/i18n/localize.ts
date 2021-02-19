import { defaultLocale } from "./locales"

const trimSlashes = (raw: string) => {
  if (raw[0] === "/") raw = raw.substr(1, raw.length)
  if (raw[raw.length - 1] === "/") raw = raw.substr(0, raw.length - 1)
  return raw
}

export const localize = (locale: string, ...subpaths: string[]) => {
  let result = ""
  subpaths = subpaths
    .map(subpath => trimSlashes(subpath))
    .filter(subpath => !!subpath)
  if (locale !== defaultLocale) subpaths.unshift(locale)
  result = subpaths.join("/")
  return `/${result}`
}
