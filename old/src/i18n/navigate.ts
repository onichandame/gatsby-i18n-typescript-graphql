import { useContext } from "react"
import { navigate as gNavigate } from "gatsby"

import { localize } from "./localize"
import { LocaleContext } from "../i18n"

export const navigate = (path: string) => {
  const locale = useContext(LocaleContext)
  return gNavigate(localize(locale, path))
}
