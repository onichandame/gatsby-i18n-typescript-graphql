import React, { FC, useContext } from "react"
import { navigate } from "gatsby"

import { locales, LocaleContext, replaceLocale } from "../../i18n"

export const Lang: FC = () => {
  const locale = useContext(LocaleContext)
  return (
    <select
      value={locale}
      onChange={e => {
        e.preventDefault()
        navigate(replaceLocale(window.location.pathname, e.currentTarget.value))
      }}
    >
      {locales.map(locale => (
        <option key={locale} id={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  )
}
