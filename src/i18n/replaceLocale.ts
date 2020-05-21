import { localize } from "./localize"
import { locales } from "./locales"

export const replaceLocale = (path: string, locale: string) => {
  const arr = path.split("/").filter(val => !!val)
  if (locales.indexOf(arr[arr.length - 1]) >= 0) arr.pop()
  return localize(locale, arr.join("/"))
}
