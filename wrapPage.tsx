import React from "react"
import { navigate } from "gatsby"

import { locales, defaultLocale } from "./src/i18n/locales"
import { localize } from "./src/i18n/localize"

const langKey = "gatsby-lang"

export const wrapPageElement = ({ element, props }, pluginOptions) => {
  if (typeof window !== "undefined") {
    const lang = window.localStorage.getItem(langKey) || defaultLocale
    const paths = window.location.pathname.split("/").filter(path => !!path)
    if (!(paths.length && locales.indexOf(paths[0]) >= 0)) {
      return navigate(localize(lang, window.location.pathname))
    }
  } else {
    return <div>{element}</div>
  }
}
