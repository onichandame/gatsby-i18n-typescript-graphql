import { defaultLocale } from "./locales"
const trimSlashes = (raw: string) => {
  if (raw[0] === "/") raw = raw.substr(1, raw.length)
  if (raw[raw.length - 1] === "/") raw = raw.substr(0, raw.length - 1)
  return raw
}

export const localize = (...subpaths: string[]) => {
  let result = ""
  subpaths = subpaths.map(subpath => trimSlashes(subpath))
  if (subpaths.length && subpaths[0] === defaultLocale) subpaths.splice(0, 1)
  result = subpaths.join("/")
  result = "/" + result
  return result
}
