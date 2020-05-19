import { localize } from "./localize"

export const replaceLocale = (path: string, locale: string) => {
  const arr = path.split("/").filter(val => !!val)
  arr.shift()
  return localize(locale, arr.join("/"))
}
