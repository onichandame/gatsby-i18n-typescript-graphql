import React, { FC, useContext } from "react"
import { navigate } from "gatsby"

import { locales, LocaleContext, replaceLocale } from "../../i18n"

export const Lang: FC = () => {
  const locale = useContext(LocaleContext)
  return (
    <select value={locale}>
      {locales.map(locale => (
        <option
          onClick={() =>
            navigate(replaceLocale(window.location.pathname, locale))
          }
          id={locale}
          value={locale}
        >
          {locale}
        </option>
      ))}
    </select>
  )
}
