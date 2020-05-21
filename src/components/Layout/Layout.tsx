import React, { FC } from "react"
import { PageProps } from "gatsby"

import { LocaleContext } from "../../i18n"
import "./Layout.css"
import { Header } from "./Header"
import { Footer } from "./Footer"

type Props = PageProps<{}, { locale: string }>

export const Layout: FC<Props> = ({ children, pageContext: { locale } }) => {
  return (
    <LocaleContext.Provider value={locale}>
      <Header />
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
