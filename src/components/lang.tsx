import React, { FC } from "react"
import { useIntl, changeLocale } from "gatsby-plugin-intl"

const locales = ["en", "cn"]

const Lang: FC = () => {
  const intl = useIntl()

  return (
    <select
      defaultValue={intl.locale}
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

export default Lang
