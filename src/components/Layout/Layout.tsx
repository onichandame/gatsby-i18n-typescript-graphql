import React, { FC, ComponentProps } from "react"

import { LocaleContext } from "../../i18n"
import "./Layout.css"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { SEO } from "./SEO"

type Props = {
  locale: string
} & ComponentProps<typeof SEO>

export const Layout: FC<Props> = ({ children, locale, title }) => {
  return (
    <LocaleContext.Provider value={locale}>
      <Header />
      <SEO title={title} />
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
