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
  result = subpaths.join("/")
  if (locale !== defaultLocale) result += "/" + locale
  if (result[0] !== "/") result = "/" + result
  return result
}
