import { localize } from "./localize"
import { locales } from "./locales"

export const replaceLocale = (path: string, locale: string) => {
  const arr = path.split("/").filter(val => !!val)
  if (locales.indexOf(arr[0]) >= 0) arr.shift()
  return localize(locale, arr.join("/"))
}
