import { localize } from "./localize"
import { locales } from "./locales"

export const replaceLocale = (path: string, locale: string) => {
  const subpaths = path.split("/").filter(subpath => !!subpath)
  const currentLocale = subpaths[0]
  if (locales.indexOf(currentLocale) >= 0) subpaths.shift()
  return localize(locale, subpaths.join("/"))
}
