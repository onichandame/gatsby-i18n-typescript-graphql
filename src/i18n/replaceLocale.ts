import { localize } from "./localize"
import { locales } from "./locales"

export const replaceLocale = (path: string, locale: string) => {
  const subpaths = path.split("/").filter(subpath => !!subpath)
  if (path.endsWith(".html")) {
    if (locales.indexOf(subpaths[subpaths.length - 2]) >= 0)
      subpaths.splice(subpaths.length - 2, 1)
  } else {
    if (locales.indexOf(subpaths[subpaths.length - 1]) >= 0) subpaths.pop()
  }
  return localize(locale, subpaths.join("/"))
}
