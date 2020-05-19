import React, { FC, ComponentProps } from "react"

import { LocaleContext, useTranslation } from "../../i18n"
import "./Layout.css"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { SEO } from "./SEO"

type Props = { pageContext?: { locale: string } } & ComponentProps<typeof SEO>

export const Layout: FC<Props> = ({
  children,
  pageContext: { locale },
  ...other
}) => {
  const {
    translations: { title }
  } = useTranslation()
  return (
    <LocaleContext.Provider value={locale}>
      <Header siteTitle={title} />
      <SEO {...other} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`
        }}
      >
        <main>{children}</main>
        <Footer />
      </div>
    </LocaleContext.Provider>
  )
}
