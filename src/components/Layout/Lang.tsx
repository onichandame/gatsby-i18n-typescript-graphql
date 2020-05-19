import React, { FC, useContext } from "react"
import { navigate } from "gatsby"

import { locales, LocaleContext } from "../../i18n"

const changeLocale = (locale: string) => {
  const currentUrl = window.location.href
  const currentLocale = currentUrl.split("/")[1]
  if (currentLocale !== locale) {
    const newUrl = currentUrl.replace(currentUrl, locale)
    navigate(newUrl)
  }
}

export const Lang: FC = () => {
  const locale = useContext(LocaleContext)
  return (
    <select
      defaultValue={locale}
      onChange={e => {
        changeLocale(e.currentTarget.value)
      }}
    >
      {locales.map(locale => (
        <option id={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  )
}
